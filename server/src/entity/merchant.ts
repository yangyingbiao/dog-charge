import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Merchant {
    @PrimaryColumn()
    merchant_id : number;

    @Column()
    merchant_name : string;

    @Column()
    service_tel : string;

    @Column()
    contacts : number;

    @Column()
    address : string;

    @Column()
    status : number;
}