import React, { useEffect, useState } from 'react'
import { View, Input } from '@tarojs/components'

import './index.scss'

export default (props) => {
    let min = 0.5
    let [quantity, setQuantity] = useState('2')
    useEffect(() => {
        props.onChange(Number(quantity))
    })
    
    function desc() {
        let q = Number(quantity)
        if(q > min) {
            setQuantity(String(q - min))
        }
    }

    function incr() {
        let q = Number(quantity)
        if(q < props.max) {
            setQuantity(String(q + min))
        }
    }

    

    return (
        <View className='overflow charge-quantity'>
            <View className='f-32 pull-left name'>充电时长：</View>
            <View className='counter pull-left m-l-20'>
                <View className={'btn ' + (Number(quantity) <= min ? 'disabled' : '')} onClick={desc}></View>
                <Input className='value' type='idcard' value={quantity} />
                <View className={'btn ' + (Number(quantity) >= props.max ? 'disabled' : '')} onClick={incr}></View>
            </View>
            <View className='pull-left unit m-l-20 font-bold'>小时</View>
        </View>
    )
}