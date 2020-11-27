import React from 'react'
import { Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import { AtButton } from 'taro-ui'


export default () => {
    let placeholderStyle = 'font-size:' + Taro.pxTransform(30)
    return (
        <View className='container text-center'>
            <Input className='w-100 input' placeholder-style={placeholderStyle} type='text' placeholder='请输入设备编号' focus/>
            <View style={'margin-top:' + Taro.pxTransform(80)}>
                <AtButton circle type='primary' size='normal'>确 定</AtButton>
            </View>
        </View>
    )
}