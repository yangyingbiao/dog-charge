import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';



@Injectable()
export class BaseService<T> {
    protected model : any;

    async insert(data : {[k in keyof T] : T[k]}) : Promise<number | null> {
        let res = await this.model.insert(data)
        let raw = res.raw
        if(raw && raw.affectedRows == 1) {
            return raw.insertId
        }
        
        return null
    }

    async update(where : QueryDeepPartialEntity<T> | string, data : QueryDeepPartialEntity<T>) : Promise<number> {
        let res = await this.model.update(where, data)
        return res.raw ? res.raw.changeRows : 0
    }

    select(where : QueryDeepPartialEntity<T> | string, field? : (keyof T)[]) : any {
        let options : {[key : string] : any} = {where : where}
        if(field) {
            options.select = field
        }
        
        return this.model.findOne(options)
    }
}
