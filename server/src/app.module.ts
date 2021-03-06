import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './controller/login/login.module';
import { CommonModule } from './controller/common/common.module';
import { UtilsModule } from './utils/utils.module';
import { HttpModule } from './http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from './model/models.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexModule } from './controller/index/index.module';
import { DeviceModule } from './controller/device/device.module';
import { ChargeModule } from './controller/charge/charge.module';
import { MerchantModule } from './controller/merchant/merchant.module';
import { StationModule } from './controller/station/station.module';
import { ChargePriceModule } from './controller/charge-price/charge-price.module';
import { PaymentModule } from './controller/payment/payment.module';
import { UserModule } from './controller/user/user.module';


import config from './config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root123",
      "database": "dog_charge",
      "charset" : "utf8mb4",
      "entities": ["dist/**/*{.ts,.js}"],
      "autoLoadEntities" : true,
      "extra" : {
          "connectionLimit": 90
      },
      "synchronize" : false
    }),

    //MongooseModule.forRoot('mongodb://localhost:27017', {dbName : 'zb_iot', poolSize : 20}),

    ConfigModule.forRoot({
      isGlobal : true,
      load : [config]
    }),
    
  LoginModule, CommonModule, UtilsModule, HttpModule, ModelsModule, RedisModule, IndexModule, DeviceModule, ChargeModule, MerchantModule, StationModule, ChargePriceModule, PaymentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
