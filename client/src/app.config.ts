export default {
  pages: ['pages/charging/index',
    'pages/charge/index',
    'pages/site/index',
    'pages/index/index',
    
    
    
    //'pages/input-deviceno/index',
    
    
    
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  permission : {
    'scope.userLocation' : {
      'desc' : '用于获取用户附近的设备'
    }
  }
}
