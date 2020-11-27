import { View, Text, Image } from '@tarojs/components'
import React from 'react'
import XImage from '../../components/x-image'

import './index.scss'

import $1png from '../../1.png'

export default () => {
    return (
        <View>
            <Image className='w-100' mode='widthFix' src={$1png}></Image>
            <View className='p-l-r container'>
                <View className='site-card'>
                    <View className='site-name'>东南小区</View>
                    <View className='site-address m-t-20'>
                        <XImage className='icon middle' src='small-location.png'></XImage>
                        <Text className='color-999'>东南西路对面72楼</Text>
                    </View>
                    <View className='m-t-20 f-24'>
                    设备数量：<Text className='color-0265ff'>10台</Text>
                    <Text className='m-l-20'>空闲插座：<Text className='color-0ab885'>10个</Text></Text>
                    </View>
                    <View className='navigation middle text-center'>
                        <XImage className='nav-icon' src='navigation.png'></XImage>
                        <View className='color-999 m-t-10 f-24'>距离约10KM</View>
                    </View>
                    <View className='color-999 f-24 m-t-20 text-justify'>充电一块钱一小时，充满不退费</View>
                </View>

                <View className='m-t-40'>
                    <View className='f-32 font-bold'>站内设备</View>
                </View>

                <View className='m-t-30'>
                    <View className='device-row'>
                        <View>设备号：1903265953</View>
                        <View className='f-24 m-t-5'>
                            <Text className='color-999'>空闲插座</Text>：<Text className='color-0ab885'>10个</Text>
                            <Text className='color-999 m-l-30'>收费标准</Text>：<Text className='color-0ab885'>10元/小时</Text>
                        </View>
                    </View>
                    <View className='device-row'>
                        <View>设备号：1925786956</View>
                        <View className='f-24 m-t-5'>
                            <Text className='color-999'>空闲插座</Text>：<Text className='color-0ab885'>10个</Text>
                            <Text className='color-999 m-l-30'>收费标准</Text>：<Text className='color-0ab885'>10元/小时</Text>
                        </View>
                    </View>
                    <View className='device-row'>
                        <View>设备号：1959420350</View>
                        <View className='f-24 m-t-5'>
                            <Text className='color-999'>空闲插座</Text>：<Text className='color-0ab885'>10个</Text>
                            <Text className='color-999 m-l-30'>收费标准</Text>：<Text className='color-0ab885'>10元/小时</Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}