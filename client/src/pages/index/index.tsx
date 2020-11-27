import React, { useEffect, useState } from 'react'
import { View, Text, Map, Navigator, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'
import markIcon from '../../assets/images/mark@2x.png'
import XImage from '../../components/x-image'
import Http from '../../http'


export default () => {
  let changeMapInter:any = null
  let _originLocation = [114.014536, 22.561585]

  let [centerLocation, setCenterLocation] = useState([..._originLocation])
  useEffect(() => {
    Taro.getLocation({
      type : 'wgs84',
      success(res) {
        setCenterLocation([res.longitude, res.latitude])
      }
    })
  }, []);

  let [deviceList, setDeviceList] = useState([
    {id : 1, longitude : 114.014536, latitude : 22.561585, iconPath : markIcon, width : 36, height : 41 }
  ])



  function mapChange(e){
    if(e.type == 'end') { //结束的
      if(changeMapInter != null) {
        clearTimeout(changeMapInter)
      }

      changeMapInter = setTimeout(() => {
          let location = e.detail.centerLocation
          console.log(location)
          console.log('获取附近设备')
        }, 2000)
      
    }
  }

  async function getNearDeviceList(longitude:number, latitude:number) {
    setDeviceList([])

    let { data } = await (new Http()).get('device/near', { longitude, latitude })
    if(data && data.length > 0) {
      setDeviceList(data)
    }
  }

  function ff(){
    console.log(444)
    let http = new Http()
    http.get('index/nearDeivce')
  }

  return (
    <View className='vh-100 relative page-view'>
      <View className='page-header p-l-r'>
        <View className='relative'>
          <View className='greetings'>
            <XImage className='user-avatar' src='morentouxiang@2x.png'></XImage>
            <View className='greetings-text'>晚上好</View>
          </View>
          <Navigator hoverClass='none' url='' className='absolute middle r-0 near-site'>
            <View className='wrap'><XImage className='location-icon middle' src='small-location.png'></XImage>附近充电站</View>
          </Navigator>
        </View>
      </View>
      <View className='page-container'>
        <Map className='h-100 w-100' optimize markers={deviceList} onRegionChange={(e) => {mapChange(e)}} longitude={centerLocation[0]} latitude={centerLocation[1]} show-location showCompass={false} />

        <View className='left-controls'>
          <Navigator hoverClass='none' url='' className='item'>
            <XImage className='icon xy' src='search.png'></XImage>
          </Navigator>
          <View className='item m-t-20'>
            <XImage className='icon xy' src='origin.png'></XImage>
          </View>
        </View>

        <View className='bottom-controls center'>
          <Navigator hoverClass='none' url='' className='absolute middle l-0'>
            <View className='input-deviceno'>
              <View className='absolute xy'>
                <XImage className='input-icon' src='input-deviceno.png'></XImage>
              </View>
            </View>
            <View className='input-text color-666 text-center f-24'>手动输入</View>
          </Navigator>

          <View className='scan-button xy' onClick={() => {ff()}}>
            <View className='absolute xy text-center'>
              <XImage className='scan-icon' src='scan.png'></XImage>
              <View className='color-fff scan-text'>扫码测试</View>
            </View>
          </View>

          <Navigator hoverClass='none' url='' className='absolute middle r-0'>
            <View className='user-center'>
              <View className='absolute xy'>
                <XImage className='user-icon' src='user-center.png'></XImage>
              </View>
            </View>
            <View className='input-text color-666 text-center f-24'>个人中心</View>
          </Navigator>
        </View>
      </View>

      {/* <View className='device-detail p-l-r'>
        <View className='wrap relative'>
          <Navigator url='' hover-class='none'>
            <View className='site-name'>西头新村</View>
            <View className='color-999 m-t-10'>北京西路东南街18号</View>
            <View className='m-t-10'>
              设备数量：<Text className='color-0265ff'>10台</Text>
              <Text className='m-l-20'>空闲插座：<Text className='color-0ab885'>10个</Text></Text>
            </View>
          </Navigator>
          <View className='navigation middle text-center'>
            <XImage className='nav-icon' src='navigation.png'></XImage>
            <View className='color-999 m-t-10 f-24'>距离约10KM</View>
          </View>
        </View>
      </View> */}
    </View>
  )
}