import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Device {
    @PrimaryColumn()
    device_id : number;

    @Column()
    station_name : string;

    @Column()
    service_tel : string;

    @Column()
    contacts : number;

    @Column()
    address : string;

    @Column()
    status : number;
}