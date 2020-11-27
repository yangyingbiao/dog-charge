import Taro from '@tarojs/taro'

interface dataFormat {
    [key:string] : any
}

export default class Http {
    private isShowLoading : boolean = false;
    constructor() {
        
    }

    load(title : string = '') {
        this.isShowLoading = true
        Taro.showLoading({mask : true, title : title})
        return this
    }

    get(url:string, params: dataFormat | string = {}) {
        let options = {
            method : 'GET',
            data : params
        }
        return this.send(url, options)
    }

    post(url, data : dataFormat | string = {}) {
        let options = {
            method : 'POST',
            data : data
        }

        return this.send(url, options)
    }

    private async send(url:string, options : dataFormat) {
        let header:{[key : string] : string | number} = {
            'Content-type' : 'application/json'
        }

        let result = await Taro.request({
            url : process.env.APIURL + url,
            ...options,
            header,
            dataType : 'json'
        })

        if(this.isShowLoading) {
            this.isShowLoading = false
            Taro.hideLoading()
        }

        let statusCode = result.statusCode
        if((statusCode >= 200 && statusCode < 300) || statusCode == 304) {
            return result.data
        }else {
            return {success : false}
        }
    }


}