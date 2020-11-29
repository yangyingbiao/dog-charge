import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class ChargeOrder {
    @PrimaryColumn()
    order_id : number;

    @Column()
    order_no : string;

    @Column()
    transaction_id : string;

    @Column()
    user_id : number;

    @Column()
    device_id : number;

    @Column()
    merchat_id : number;

    @Column()
    station_id : number;

    @Column()
    unit_price : number;

    @Column()
    min_settle_quantity : number;

    @Column()
    charge_quantity : number;

    @Column()
    amount : number;

    @Column()
    consume_quantity : number;

    @Column()
    consume_amount : number;

    @Column()
    create_time : number;

    @Column()
    start_time : number;

    @Column()
    end_time : number;
}