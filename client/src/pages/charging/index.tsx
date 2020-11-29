import React from 'react'
import { View, Text, Swiper, SwiperItem, Button } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

import './index.scss'
import Http from '../../http/'

export default (props) => {
    function stopCharge() {
        let http = new Http()
        http.post('charge')
    }
    return (
        <View className='vh-100 page-view'>
            <View id='a'></View>
            <Swiper className='swiper'>
                <SwiperItem className='swiper-item'>
                    <View className='order-card'>
                        <AtDivider content='已充时长' fontSize='40' height='150' fontColor='#333333' lineColor='#f3f4f5' />
                        <View className='charge-time'>
                            <Text className='number'>0</Text>
                            <Text className='unit'> 小时</Text>
                            <Text className='number'> 6</Text>
                            <Text className='unit'> 分钟</Text>
                            <Text className='number'> 20</Text>
                            <Text className='unit'> 秒</Text>
                        </View>
                        <View className='order-info'>
                            <View>
                                <Text className='f-32'>预付金额</Text>
                                <Text className='pull-right f-32'>3元</Text>
                            </View>
                            <View>
                                <Text className='color-666'>设备编号</Text>
                                <Text className='pull-right color-666'>1903265953</Text>
                            </View>
                            <View>
                                <Text className='color-666'>插座编号</Text>
                                <Text className='pull-right color-666'>#1号</Text>
                            </View>
                            <View>
                                <Text className='color-666'>开始充电时间</Text>
                                <Text className='pull-right color-666'>2020-11-26 20:10:12</Text>
                            </View>
                        </View>
                        <View className='m-t-30 text-right'><Text>客服电话：</Text><Text className='color-primary'>13542046429</Text></View>
                    </View>
                </SwiperItem>
            </Swiper>
            
            <View className='indicator m-t-40'>
                <View className='dot active'></View>
                <View className='dot'></View>
                <View className='dot'></View>
            </View>

            <View className='text-center m-t-60'>共<Text className='color-primary f-36'> 3 </Text>个订单</View>

            <View className='confirm-button p-l-r'>
                <Button type='primary' hover-class='none' className='f-32' onClick={stopCharge}>停止充电</Button>
            </View>

        </View>
    )
}