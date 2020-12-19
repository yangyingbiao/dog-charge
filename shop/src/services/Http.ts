import { request } from 'umi'
import { API_URL } from '@/config'

interface Options {
    method : 'POST' | 'GET';
    data? : any;
    params? : object;
    processData?: boolean;
}

interface Result {
    success? : boolean;
    code? : number;
    data? : any;
    msg? : string;
}

class Http {
    private sending:boolean = false;

    async post(url: string, data?: any, params? : object)  : Promise<Result>{
        if(this.sending) {
            throw '请等待'
        }
        this.sending = true
        let result = await Http.post(url, data, params)
        this.sending = false
        return result
    }

    static post(url: string, data?: any, params? : object) : Promise<Result> {
        let options:Options = {
            method : 'POST'
        }
        if(data) {
            options.data = data
            if(data instanceof FormData) {
                options.processData = false
            }
        }

        if(params) {
            options.params = params
        }

        return Http._send(url, options)
    }

    async get(url: string, params? : object, data?: any) : Promise<Result>{
        if(this.sending) {
            throw '请等待'
        }
        this.sending = true
        let result = await Http.get(url, params, data)
        this.sending = false
        return result
    }

    static get(url: string, params? : object, data?: any) : Promise<Result>{
        let options:Options = {
            method : 'GET'
        }

        if(params) {
            options.params = params
        }

        if(data) {
            options.data = data
        }

        return Http._send(url, options)
    }

    private static async _send(url: string, options: Options) : Promise<Result>{
        try {
            let result:Result = await request<Result>(API_URL + url, {
                charset : 'utf8',
                requestType : 'json',
                ...options
            })

            result.success = result.code == 200
    
            return result
        } catch (error) {
            return {
                success : false,
                code : 404,
                msg : '网络错误'
            }
        }
    }
}

export default Http