import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Input, Button, message } from 'antd'
import styles from './index.less'

import { saveImageGroup } from '@/services/goods'

const AddImageGroupNode = (props: any) => {
    let [name, setName] = useState('')
    let [showAdd, setShowAdd] = useState(false)
    let [loading, setLoading] = useState(false)
    function toggleShowAdd() {
        showAdd = !showAdd
        setShowAdd(showAdd)
        setName('')
    }

    function inputName(name: string) {
        setName(name)
    }

    async function confirm() {
        if(name === '') {
            message.error('请填写分组名')
            return
        }
        setLoading(true)
        let result = await saveImageGroup(name)
        setLoading(false)
        if(result.success) {
            message.info('保存成功')
            if(typeof props.finish === 'function') {
                props.finish({ name, id : result.data })
            }
            toggleShowAdd()
        }else {
            message.error(result.msg)
        }


        
    }

    return (
        <span className='relative'>
            <span className='cursor-pointer' onClick={toggleShowAdd}>
                <PlusOutlined /> 增加分组
            </span>
        {showAdd &&
            <div className={'middle ' + styles.addImageGroupForm}>
                <div>分组名</div>
                <div className='flex-1 m-l-10'>
                    <Input type='text' value={name} onChange={e => { inputName(e.target.value)}} />
                </div>
                <div className='m-l-10'>
                    <Button onClick={toggleShowAdd}>取消</Button>
                    <Button type='primary' className='m-l-5' onClick={confirm} loading={loading}>确定</Button>
                </div>
            </div>
        }
        
            
        </span>
    )
}

export default AddImageGroupNode