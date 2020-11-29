import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Device {
    @PrimaryColumn()
    device_id : number;

    @Column()
    merchant_name : string;

    @Column()
    merchant_id : number;

    @Column()
    station_name : string;

    @Column()
    station_id : number;

    @Column()
    price_id : number;

    @Column()
    service_tel : string;

    @Column()
    contacts : number;

    @Column()
    address : string;

    @Column()
    status : number;
}