export default {
  pages: [
	 'pages/index/index',
    'pages/charge/index',
    'pages/charging/index',
    'pages/site/index',
    
    
    
    
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
