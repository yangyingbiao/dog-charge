import React, { useEffect, useState } from 'react'

import { Label, RadioGroup, Radio, View, Text } from '@tarojs/components'

import './index.scss'

export default (props) => {
    let [channel, setChannel] = useState(2)
    useEffect(() => {
        props.onChange(channel)
    })

    return (
        <RadioGroup onChange={(e) => setChannel(e.detail.value) }>
            <View className='pay-option'>
                <Label className='example-body__label' for='1' key='1'>
                    <Radio className='radio' id='1' value='1' checked={channel == 1}></Radio><Text className='pay-name'>微信支付</Text>
                </Label>
            </View>
            <View className='pay-option link'>
                <Label className='example-body__label' for='2' key='2'>
                    <Radio className='radio' id='2' value='2' checked={channel == 2}></Radio><Text className='pay-name'>余额支付</Text><Text className='color-0265ff'>（剩余：80元）</Text>
                </Label>
                <Text className='charge-tips f-24 color-0ab885'>充值更优惠</Text>
            </View>
        </RadioGroup>
    )
}