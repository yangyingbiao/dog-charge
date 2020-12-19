import React, { useEffect, useState } from 'react'
import lodash, { size } from 'lodash'

import styles from './index.less'
import { Button, Modal, Form, Select, Upload, message, Spin, Empty } from 'antd'
import { CheckOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'

import AddImageGroup from './addImageGroup' //新增图片分类组件

import { getImageGroup, getGoodImageByLastId, uploadGoodsImage } from '@/services/goods'
import XossImage from '../XossImage'

function XgoodsImagePicker(props : {
    style? : any;
    className? : string;
    count? : number;
    onFinish? : {
        (result : string | string[]) : void;
    }
}) {

    let count = props.count || 1

    let [currentAction, setCurrentAction] = useState<'select' | 'upload'>('select') //面板切换
    let [currentGroupId, setCurrentGroupId] = useState(0) //当前选择的图片分组Id
    let [currentLastImageId, setCurrentLastImageId] = useState(0) //图片列表最后的一个图片的id
    let [imageGroupList, setImageGroupList] = useState<API.ImageGroup[]>([]) //图片分类菜单
    let [loadingImageList, setloadingImageList] = useState(false) //是否正在加载图片列表
    let [hasNextImageList, sethasNextImageList] = useState(true)
    let [imageList, setImageList] = useState<API.GoodsImage[]>([]) //图片列表
    let [selectedImageIndexes, setSelectedImageIndexes] = useState<number[]>([]) //被选中的图片索引数组


    function toggleCurrentAction() { //切换选择面板
        setCurrentAction(currentAction == 'select' ? 'upload' : 'select')
    }

    function selectImageGroup(groupId: number) { //选择分组
        if(loadingImageList) return //正在加载的话，不让请求
        if(currentGroupId != groupId) {
            currentGroupId = groupId
            currentLastImageId = 0
            hasNextImageList = true
            sethasNextImageList(true)
            setCurrentLastImageId(0) //把最后的图片id重置为0
            setSelectedImageIndexes([]) //清空已选择的图片
            setImageList([]); //清空图片列表
            setCurrentGroupId(groupId)
            getGoodsImage()
        }
    }

    function selectedImage(index : number) { //选择图片
        if(count == 1) {
            selectedImageIndexes.splice(0)
            selectedImageIndexes.push(index)
        }else {
            let indexOf = selectedImageIndexes.indexOf(index)
            if(indexOf == -1) {
                if(selectedImageIndexes.length >= count) return
                selectedImageIndexes.push(index)
            }else {
                selectedImageIndexes.splice(indexOf, 1)
            }
        }
        
        setSelectedImageIndexes([...selectedImageIndexes])
    }

    function handleAddImageGroup(group : API.ImageGroup) { //增加分组后触发的，把新分组加到分组列表
        imageGroupList.push(group)
        setImageGroupList(lodash.cloneDeep(imageGroupList))
    }


    async function getGoodsImage() { //请求分组图片
        setloadingImageList(true)
        let data = await getGoodImageByLastId(currentGroupId, currentLastImageId, 3)
        setloadingImageList(false)
        if(data.length > 0) {
            setImageList(imageList.concat(data))
            setCurrentLastImageId(data[data.length - 1].id)
        }

        if(data.length < 3) {
            sethasNextImageList(false)
        }
    }
    

    useEffect(() => {
        getImageGroup().then( data => { //获取图片分组菜单栏
            if(data && data.length > 0) {
                currentGroupId = data[0].id
                setImageGroupList(data)
                setCurrentGroupId(currentGroupId)
                //获取第一个分组的图片
                getGoodsImage()

            }else {
                getGoodsImage()
            }
        })
    }, [])

    let [confirmLoading, setconfirmLoading] = useState(false) //点击确定时，按钮loading
    let [uploadImageGroupId, setuploadImageGroupId] = useState(0) //上传图片归属的分钟
    let [fileList, setFileList] = useState<any[]>([]) //选择上传的图片对象
    function removeImage(e:any) { //删除图片
        fileList = fileList.filter(file => file.name != e.name)
        setFileList([...fileList])
    }

    function handleBeforeUpload(file : object) {
        fileList.push(file)
        if(fileList.length > 10) {
            fileList.splice(10)
        }
        setFileList([...fileList])
        return false
    }

    



    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = async () => {
        if(currentAction == 'upload') { //上传图片
            if(fileList.length == 0) {
                message.error('请选择图片')
                return
            }
            let formData = new FormData();
            for(let i = 0; i < fileList.length; i ++) {
                formData.append('file[]', fileList[i]);
            }
            setconfirmLoading(true)
            let result = await uploadGoodsImage(fileList, uploadImageGroupId)
            setconfirmLoading(false)
            if(result.success) {
                setFileList([])
                setCurrentAction('select')
                message.info('上传成功' + result.data.length + '张图片')
            }else {
                message.error(result.msg)
            }
        }else { //选择图片
            if(props.onFinish) {
                props.onFinish(selectedImageIndexes.map(index => imageList[index].filename))
            }
            setIsModalVisible(false)
        }
    }

    const handleCancel = () => {
        if(currentAction == 'upload') { //返回到选择图片
            toggleCurrentAction()
        }else {
            setIsModalVisible(false);
        }
        
    }
    

    
  return (
    <>
      <div style={props.style || {}} className={styles.placeholder + (props.className ? (' ' + props.className) : '')} onClick={showModal}>
          <span className={styles.icon}>
            <PlusOutlined />
          </span>
      </div>
      <Modal destroyOnClose={true} confirmLoading={confirmLoading} title={currentAction === 'select' ? '选择图片' : '上传图片'} cancelText={currentAction === 'select' ? '取消' : '返回'} width='800px' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {currentAction === 'select' &&
      <>
        <div className={styles.container}>
            <aside className={styles.aside}>
                <Button type='dashed' onClick={toggleCurrentAction}>上传图片</Button>
                <div className={styles.item}>
                    <Button block type={currentGroupId == 0 ? 'primary' : 'default'} onClick={() => { selectImageGroup(0) } }>未分组</Button>
                </div>
                {
                    imageGroupList.map((item, index) => <div key={index} className={styles.item}><Button block type={currentGroupId == item.id ? 'primary' : 'default'} onClick={() => { selectImageGroup(item.id) } }>{item.name}</Button></div>)
                }
            </aside>
            <main className={styles.main}>
                <div className={styles.imageContainer}>
                    {loadingImageList &&
                     <Spin />
                    }

                    {imageList.length > 0
                    ? <div className={styles.images}>
                        {
                            imageList.map((item, index) => {
                                let className = styles.item
                                let indexOf = selectedImageIndexes.indexOf(index)
                                if(indexOf >= 0) {
                                    className += ' ' + styles.selected
                                }
                                return (
                                    <div className={className} key={index} onClick={() => { selectedImage(index) }}>
                                        <XossImage preview={false} src={item.filename}/>
                                        <span className={styles.selectedNo}>
                                            {count == 1
                                             ? <CheckOutlined style={{color : '#fff'}} />
                                             : indexOf + 1
                                            }
                                        </span>
                                    </div>
                                )
                            })
                        }
                        
                        </div>

                    : <Empty />

                    }
                    
                </div>
                <div className='text-center'>
                    {hasNextImageList &&
                    <Button loading={loadingImageList} onClick={getGoodsImage}>
                        <RightOutlined />
                    </Button>
                    }
                </div>
            </main>
        </div>
        </>
        }

        {currentAction === 'upload' &&
        <div>
            <Form labelCol={{span : 3}}>
                <Form.Item label='所在分组'>
                    <Select style={{width : '300px'}} placeholder='选择分组' value={uploadImageGroupId} onChange={ id => { setuploadImageGroupId(Number(id)) }}>
                        <Select.Option key={0} value={0}>未分组</Select.Option>
                        {
                            imageGroupList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                        }
                    </Select>
                    <span className='m-l-5'>
                        <AddImageGroup finish={ handleAddImageGroup }></AddImageGroup>
                    </span>
                </Form.Item>
                <Form.Item  label='选择图片' name='fileList' rules={[{required : true}]}>
                    <Upload accept='image/png,image/jpg,image/jpeg' multiple listType='picture-card' showUploadList={{showPreviewIcon : false, showRemoveIcon : true}} onRemove={(e) => { removeImage(e) }} beforeUpload={handleBeforeUpload}>
                        {fileList.length < 10 &&
                            <div className={styles.upload}>
                                <PlusOutlined className='absolute xy' />
                            </div>
                        }
                    </Upload>
                </Form.Item>
            </Form>
        </div>
        }


      </Modal>
    </>
  );
}


export default XgoodsImagePicker