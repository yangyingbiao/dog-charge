import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { AutoComplete, Button, Card, Checkbox, Form, Input, message, Popconfirm, Spin, Table, Upload } from 'antd';
import styles from './index.less';

import lodash from 'lodash'

import XinnerTitle from '@/components/XinnerTitle'
import { CloseCircleOutlined } from '@ant-design/icons';
import XgoodsImagePicker from '@/components/XgoodsImagePicker'
import XimgThumb from '@/components/XimgThumb';

interface Sku {
  name : string;
  values : any[];
  image? : string[];
}

interface SkuDetail {
  sku : any[],
  price : number | string,
  stock : number | string;
  weight? : number | string;
}

interface GoodsData {
  goodsName : string;
  goodsShareTitle? : string;
  goodsDesc? : string;
  goodsImage : string[],
  goodsVideo? : string;
  goodsDetail : string;
}

const ModuleLabel : React.FC = (props : any) => {
  return (
    <div className={styles.moduleLabel}>{props.children}</div>
  )
}


export default () => {
  function createSkuDetail() {
    let results : any[] = [];
    let result : any[] = [];
    function doExchange(arr : any[], depth : number) {
        if(arr.length == 0) return results
        for (var i = 0; i < arr[depth].length; i++) {
            result[depth] = arr[depth][i]
            if (depth != arr.length - 1) {
                doExchange(arr, depth + 1)
            } else {
                //results.push([...result])
                let detail:SkuDetail = {
                  sku : [...result],
                  price : '',
                  stock : '',
                  weight : '',
                }

                // if(skuDetailList[results.length]) {
                //   detail.price = skuDetailList[results.length].price
                // }

                results.push(detail)
            }
        }

        return results
    }

    return doExchange
  }

  let maxImageCount = 5

  let [formData, setFormData] = useState<GoodsData>({
    goodsName : '',
    goodsImage : [],
    goodsDesc : '',
    goodsShareTitle : '',
    goodsDetail : '',
    goodsVideo : ''
  })


  let [skuDetailNames, setSkuDetailNames] = useState<string[]>([])

  let [skuDetailList, setSkuDetailList] = useState<any[]>([])



  let [skuList, setSkuList] = useState<Sku[]>([])
  useEffect(() => {
    let names:string[] = []
    skuList.forEach(item => {
      for(let i = 0; i < item.values.length; i ++) {
        if(item.values[i] !== '') {
          names.push(item.name)
          break
        }
      }
    })
    setSkuDetailNames([...names])
  }, [skuList])


  function inputGoodsInfo(value : any, name : string) { //输入商品信息
    formData[name] = value
    setFormData(lodash.cloneDeep(formData))
  }

  function addSkuItem() {
    setSkuList([...skuList.concat({name : '', values : [], image : []})])
  }

  function removeSkuItem(index:number) {
    skuList.splice(index, 1)
    setSkuList(lodash.cloneDeep(skuList))
    updateSkuDetailList(skuList)
  }

  function addSkuValue(index : number) {
    skuList[index].values.push('')
    if(index == 0) {
      skuList[index].image?.push('')
    }
    setSkuList([...skuList])
  }

  function removeSkuValue(index:number, i:number) { //删除sku值
    let value = skuList[index].values[i]
    skuList[index].values.splice(i, 1)
    setSkuList(lodash.cloneDeep(skuList))

    if(value !== '') {
      updateSkuDetailList(skuList)
    }
  }

  function selectSkuName(name : string, index : number) {
    if(name !== '') {
      let names : string[] = skuList.map(item => item.name)
      if(names.includes(name)) {
        message.error('已经存在相同的规格名')
        name = skuList[index].name
      }

      if(skuList[index].values.length == 0) { //选择规格名称时，如果还没有值，给一个值
        skuList[index].values.push('')
      }

    }
    

    skuList[index].name = name
    setSkuList([...skuList])
  }

  function updateSkuDetailList(skuList : Sku[]) {
    let arr :any[] = [];
    skuList.forEach(item => {
      let tmp = item.values.filter(v => v !== '')
      if(tmp.length > 0) {
        arr.push(tmp)
      }
    })

    if(arr.length > 0) {
      setSkuDetailList(lodash.cloneDeep(createSkuDetail()(arr, 0)))
    }else {
      setSkuDetailList([])
    }
  }


  function inputSkuValue(value : string | number, index : number, i : number) {
    if(value !== '') {
      let _value = skuList[index].values[i]
      if(skuList[index].values.includes(value)) {
        value = _value
        message.error('已经存在相同的规格值')
      }
      
    }

    skuList[index].values[i] = value
    
    setSkuList([...skuList])

    updateSkuDetailList(skuList)
    
  }

  function inputSkuDetailAttr(value:number | string, index:number, name:keyof SkuDetail) {
    skuDetailList[index][name] = value
    setSkuDetailList(lodash.cloneDeep(skuDetailList))
  }

  function sleectGoodsImage(images: string[]) { //选择商品图片
    console.log(images)
    if(images.length > 0) {
      formData.goodsImage = formData.goodsImage.concat(images)
      setFormData({...formData})
    }
  }

  function selectSkuImage(image: string[], index: number) { //选择规格图
    skuList[0].image[index] = image[0]
    setSkuList([...skuList])
  }


  function confrim() {
    console.log(JSON.stringify(skuList))
  }

  return (
    <Form>
      <PageContainer content="这是一个新页面，从这里进行开发！">
        <Card>
          <section>
              <XinnerTitle>基本信息</XinnerTitle>
              <div className='m-t-15'>
                <Form.Item label={<ModuleLabel>商品名称</ModuleLabel>}>
                  <Input value={formData.goodsName} onChange={e => { inputGoodsInfo(e.target.value, 'goodsName') }} />
                </Form.Item>
                <Form.Item label={<ModuleLabel>商品描述</ModuleLabel>}>
                  <Input value={formData.goodsDesc} onChange={e => { inputGoodsInfo(e.target.value, 'goodsDesc') }} />
                </Form.Item>
                <Form.Item label={<ModuleLabel>分享描述</ModuleLabel>}>
                  <Input value={formData.goodsShareTitle} onChange={e => { inputGoodsInfo(e.target.value, 'goodsShareTitle') }} />
                </Form.Item>
                <Form.Item label={<ModuleLabel>商品图片</ModuleLabel>}>
                  <div>
                    {
                      formData.goodsImage.map((item, index) => <XimgThumb className='m-r-5' key={index} src={item}></XimgThumb>)
                    }
                    {formData.goodsImage.length < maxImageCount &&
                      <XgoodsImagePicker count={maxImageCount - formData.goodsImage.length} onFinish={sleectGoodsImage}></XgoodsImagePicker>
                    }
                  </div>
                  <div className='f-12 color-999 m-t-10'>建议尺寸：800*800像素，最多上传{maxImageCount}张</div>
                </Form.Item>
              </div>
          </section>
          <section>
              <XinnerTitle>价格库存</XinnerTitle>
              <div className='m-t-15'>
                <Form.Item label={<ModuleLabel>商品分类</ModuleLabel>}>
                  <div className={styles.rcSku}>
                    {
                      skuList.map((item, index) => 
                        <section className={styles.skuSection} key={index}>
                          <span className={styles.rmSkuSection} onClick={() => { removeSkuItem(index) }}>
                            <CloseCircleOutlined color='#fff' />
                          </span>
                          <div className={styles.title}>
                            <Form.Item className={styles.formItem} label='规格名'>
                              <div className={styles.skuName}>
                                <AutoComplete value={item.name} onSelect={e => { selectSkuName(e, index) }} options={[{ value: '颜色' }, { value: '尺寸' }, { value: '重量' }]}
                                />
                              </div>
                            </Form.Item>
                            {index == 0 && item.values.length > 0 &&
                              <div className={styles.addPicCheckbox}>
                                <Checkbox>添加规格图片{item.name}</Checkbox>
                              </div>
                            }
                          </div>
                          {item.name.length > 0 &&
                          <div className={styles.value}>
                            <Form.Item className={styles.formItem} label='规格值' style={{marginBottom : 0}}>
                              {
                                item.values.map((value, i) => 
                                  <div key={i} className={styles.skuValue}>
                                   <div>
                                      <Input type='text' value={value} onChange={e => { inputSkuValue(e.target.value, index, i) }} />
                                      <span className={styles.rmSkuValue} onClick={() => { removeSkuValue(index, i) }}>
                                        <CloseCircleOutlined color='#fff' />
                                      </span>
                                    </div>
                                    <div className='m-t-10 text-center'>
                                      <XgoodsImagePicker onFinish={e => { selectSkuImage(e, i) }}></XgoodsImagePicker>
                                    </div>
                                  </div>
                                )
                              }
                              <span className='color-primary cursor-pointer' onClick={() => { addSkuValue(index) }}>增加规格值</span>
                            </Form.Item>
                          </div>
                          }
                        </section>
                      )
                    }
                    <section>
                      <div className={styles.title}>
                        <Button onClick={() => { addSkuItem() }}>添加规格项目</Button>
                      </div>
                    </section>
                  </div>
                </Form.Item>
              </div>

              {skuDetailList.length > 0 &&
                  <div>
                    <Form.Item label={<ModuleLabel>规格明细</ModuleLabel>}>
                      <div className={styles.skuDetail}>
                        <table className='w-100'>
                          <thead>
                            <tr>
                            {
                              skuDetailNames.map((item, index) => <th key={index} className={styles.th}>{item}</th>)
                            }
                              <th className={styles.th}>价格</th>
                              <th className={styles.th}>库存</th>
                              <th className={styles.th}>重量</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            skuDetailList.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {
                                    item.sku.map((v : any, i : number) => <td className={styles.td} key={i}>{v}</td>)
                                  }
                                  <td className={styles.td}>
                                    <Input type='number' value={item.price} onChange={ e => { inputSkuDetailAttr(e.target.value, index, 'price') } }/>
                                  </td>
                                  <td className={styles.td}>
                                    <Input type='number' value={item.stock} onChange={ e => { inputSkuDetailAttr(e.target.value, index, 'stock') } }/>
                                  </td>
                                  <td className={styles.td}>
                                    <Input type='number' value={item.weight} onChange={ e => { inputSkuDetailAttr(e.target.value, index, 'weight') } }/>
                                  </td>
                              
                                </tr>
                              )
                            })
                          }
                          </tbody>
                        </table>
                      </div>
                    </Form.Item>
                  </div>
              }
              
          </section>
        </Card>
      </PageContainer>
      <FooterToolbar>
        <Button type='primary' onClick={confrim}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};
