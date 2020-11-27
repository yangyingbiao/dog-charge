import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { RedisService } from 'src/redis/redis.service';
import { DeviceService as DeviceServiceModel } from 'src/model/device/device.service'
import { MerchantService as MerchantServiceModel } from 'src/model/merchant/merchant.service';
import { StationService as StationServiceModel } from 'src/model/station/station.service';
import { ChargePriceService as ChargePriceServiceModel } from 'src/model/charge-price/charge-price.service';
import { json } from 'express';


@Injectable()
export class DeviceService {
    constructor(
        private deviceModel : DeviceServiceModel,
        private merchantModel : MerchantServiceModel,
        private stationModel : StationServiceModel,
        private chargePriceModel : ChargePriceServiceModel,
        private redis : RedisService
    ) {}

    async getDeviceInfo(deviceId : number) {
        let deviceKey = 'dev_' + deviceId
        
        let devCacheIsExists = true
        let deviceInfo = await this.redis.get(deviceKey)
        if(!deviceInfo) {
            devCacheIsExists = false
            deviceInfo = await this.deviceModel.select({device_id : deviceId})
            if(!deviceInfo) {
                this.redis.set(deviceKey, this.configService.get('cache_null'), 600)
                return null
            }
        }else {
            if(deviceInfo == process.env.cache_null) return null
            deviceInfo = JSON.parse(deviceInfo)
        }

        if(deviceInfo.status != 1) { //设备禁用
            if(!devCacheIsExists) this.redis.set(deviceKey, deviceInfo) //没有缓存，放进缓存
            throw '设备暂停使用'
        }

        if(deviceInfo.merchant_id > 0) { //
            let merchant = await this.redis.get('merchant_' + deviceInfo.merchant_id)
            if(!merchant) { //缓存没有
                merchant = await this.merchantModel.select({merchant_id : deviceInfo.merchant_id}, ['merchant_name', 'status'])
                if(merchant) { //商家被禁用
                    //放入缓存
                    this.redis.set('merchant_' + deviceInfo.merchant_id, merchant)
                    if(merchant.status != 1) throw '设备暂停使用'
                }
            }else {
                if(merchant != process.env.cache_null) {
                    merchant = JSON.parse(merchant)
                    if(merchant.status != 1) throw '设备暂停使用'
                }
                
            }

            if(deviceInfo.merchant_name == undefined && merchant) {
                deviceInfo.merchant_name = merchant.merchant_name
            }
        }

        if(deviceInfo.station_id > 0) { //
            let station = await this.redis.get('station_' + deviceInfo.station_id)
            if(!station) {
                station = await this.stationModel.select({station_id : deviceInfo.station_id}, ['station_name', 'status'])
                if(station && station.status != 1) { //站点
                    //放入缓存
                    this.redis.set('station_' + deviceInfo.station_id, station)
                    if(station.status != 1) throw '设备暂停使用'
                }
            }else {
                if(station != process.env.cache_null) {
                    station = JSON.parse(station)
                    if(station.status != 1) throw '设备暂停使用'
                }
               
            }

            if(deviceInfo.station_name == undefined && station) {
                deviceInfo.station_name = station.station_name
            }

        }

        let price = null

        if(deviceInfo.price_id > 0) {
            price = await this.redis.get('price_' + deviceInfo.price_id)
            if(!price) {
                price = await this.chargePriceModel.select({price_id : deviceInfo.price_id})
                if(price) { //写入缓存
                    this.redis.set('price_' + deviceInfo.price_id, price)
                }
            }else{
                if(price != process.env.cache_null) {
                    price = JSON.parse(price)
                }
            }
        }


        if(!devCacheIsExists) { //写进缓存
            this.redis.set(deviceKey, deviceInfo)
        }

        return {device : deviceInfo, price}
    }
}
