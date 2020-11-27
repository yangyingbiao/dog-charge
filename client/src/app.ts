import { Component } from 'react'

import './app.scss'

import Taro from '@tarojs/taro'
import Http from './http'


process.env.APIURL = 'http://localhost:3000/'


class App extends Component {
  loginComplete(data) {
    process.env.access_token = data.access_token
    let time = Math.floor((new Date()).getTime())
    let params = {
        access_token : data.access_token,
        refresh_token : data.refresh_token,
        expire_in : time + data.expire, //登陆有效期
        refresh_expire_in : time + data.refresh_expire, //刷新token有效期
    }

    Taro.setStorage({
      key : 'access_info',
      data : params
    })
    
  }

  async login(params) {
    let http = new Http()
    let result = await http.load().post('login', params)
    if(result.success) {
      let data = result.data

      this.loginComplete(data)
      this.refreshLogin(data.refresh_expire - 600)
      
    }else {
        Taro.showModal({title : '登陆失败'})
    }
  }

  refreshLogin(time) { //刷新登录
    setTimeout(async () => {
      let accessInfo = Taro.getStorageSync('access_info')
      let http = new Http()
      let result = await http.post('login/refresh', {token : accessInfo.refresh_token})
      if(result.success) {
        this.loginComplete(result.data)
      }
    }, time)
  }

  wxLogin() {
    Taro.login({
      success : res => {
        if (res.code) {
          
        }
      }
    })
  }

  

  componentDidMount () {
    if(Taro.getEnv() == 'WEAPP') { //微信小程序
      let accessInfo = Taro.getStorageSync('access_info')
      if(!accessInfo) { //登陆
        this.wxLogin()
      }else { //判断微信session有无过期
        Taro.checkSession({
          success : () => {
            let time = Math.floor((new Date()).getTime()) //当前时间
            let offsetTime = accessInfo.refresh_expire_in - time //剩余还有多久过期
            if(offsetTime < 5400) { //距离过期时间小于一个半小时，重新登录
              this.wxLogin()
            }else {
              this.refreshLogin(offsetTime - 600)
            }
          },

          fail: () => {
            this.wxLogin()
          }
        })
      }
    }
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
