import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class ChargePrice {
    @PrimaryColumn()
    price_id : number;

    @Column()
    unit_price : number;
}