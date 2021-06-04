import React, { useEffect, useState } from 'react'
import {  View } from '@tarojs/components'
import ChargeQuantityCounter from './charge-quantity-counter'

import PayChannelOption from './pay-channel'

import './index.scss'
import { useRouter } from '@tarojs/taro'
import Http from '../../http'

let http = new Http()


export default () => {
    const query = useRouter().params

    let [chargePrice, setChargePrice] = useState(1)

    let [chargeQuantity, setChargeQuantity] = useState(0)
    let [selectedPortIndex, setSelectedPortIndex] = useState(-1)

    let [portList, setPortList] = useState(
        [
            {port_id : 1, port_no : 1, status : 0, satus_text : '空闲'},
            {port_id : 2, port_no : 2, status : 1, satus_text : '充电中'},
            {port_id : 3, port_no : 3, status : 0, satus_text : '空闲'},
            {port_id : 4, port_no : 4, status : 0, satus_text : '空闲'},
            {port_id : 5, port_no : 5, status : 0, satus_text : '空闲'},
            {port_id : 6, port_no : 6, status : 0, satus_text : '空闲'},
            {port_id : 7, port_no : 7, status : 0, satus_text : '空闲'},
            {port_id : 8, port_no : 8, status : 0, satus_text : '空闲'},
            {port_id : 9, port_no : 9, status : 0, satus_text : '空闲'},
            {port_id : 10, port_no : 10, status : 0, satus_text : '空闲'}
        ]
    )

    useEffect(async () => {
        {
            let result = await http.get('device', {deviceNo : query.deviceNo}) //获取设备信息
        }

        {
            let result = await http.get('device', {deviceNo : query.deviceNo}) //获取余额
        }



    }, [])

    let portElList = portList.map((port, index) => {
        let optionClass = 'port-option'
        
        let statusClass = 'port-status'
        if(port.status == 0) {
            statusClass += ' free'
        }else {
            optionClass += ' disabled'
            statusClass += ' charging'
        }

        if(selectedPortIndex == index) {
            optionClass += ' selected'
        }

        return (
            <View onClick={() => { if(port.status == 0) setSelectedPortIndex(index) }}>
                <View className={optionClass}>
                    <View className='wrap xy'>{port.port_no}</View>
                </View>
                <View className={statusClass}>{port.satus_text}</View>
            </View>
        )
    })

    let [payChannel, setPayChannel] = useState(1)

    function charge() {
        http.post('charge', {})
    }

    return (
        <View className='vh-100 page-view'>
            <View className='row f-32'>收费标准：{chargePrice}元/小时</View>
            <View className='blank'></View>
            <View className='p-l-r m-t-30'>
                <View className='f-32'>选择充电插座</View>
                <View className='port-option-list m-t-20'>
                    {portElList}
                </View>
            </View>

            <View className='blank m-t-30'></View>
            <View className='p-l-r m-t-30'>
                <ChargeQuantityCounter max={10} onChange={setChargeQuantity}></ChargeQuantityCounter>
            </View>

            <View className='blank m-t-30'></View>
            <View className='p-l-r m-t-30'>
                <View className='f-32'>支付方式：</View>
                <View className='m-t-10'>
                    <PayChannelOption onChange={e => { setPayChannel(e) }}></PayChannelOption>
                </View>
            </View>

            <View className='blank'></View>
            <View className='p-l-r m-t-30'>
                <View className='f-32 color-bd1c1c'>提示：</View>
                <View className='color-999 f-24 text-justify m-t-20'>计量收费是根据用户充电时的实际功率分时段进行收费，每时段为1分钟，不足一分钟的按1分钟计。在任何情况下停止充电后均不在进行收费。</View>
            </View>

            <View className='footer-nav'>
                <View className='amount font-bold p-l'>需支付：{chargePrice * chargeQuantity}元</View>
                <View className='confirm-button' onClick={charge}>立即充电</View>
            </View>

        </View>
    )
}