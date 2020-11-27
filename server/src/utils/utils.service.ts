import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    static successResponse(msg:string | object | number | null = 'success', data:any = null) {
        if(typeof msg != 'string') {
            data = msg
            msg = 'success'
        }
        return {code : 200, msg : 'success', data : data}
    }

    static errorResponse(msg:string|number = 'fail', code:number = 400) {
        if(typeof msg == 'number') {
            code = msg
            msg = 'fail'
        }
        return {code : code, msg : msg, data : null}
    }
}

export function getCurrentTime() : number{
    return Math.floor((new Date()).getTime() / 1000)
}

export function random(min : number, max : number) : number {
    return min + Math.floor(Math.random() * (max - min))
}

export function ksort(obj : object) : object{
    let keys = Object.keys(obj).sort()
    , sortedObj = {};

    for(let i in keys) {
        sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
}

export function md5(content : string | number) : string {
    return require('crypto').createHash('md5').update(content).digest('hex')
}