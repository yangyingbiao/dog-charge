import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryColumn()
    user_id : number;

    @Column()
    nickname : string;

    @Column()
    avatar : string;

    @Column()
    source : number;

    @Column()
    openid : string;

    @Column()
    session_key : string;

    @Column()
    unionid : string;

    @Column()
    amount : number;

    @Column()
    reward_amount : number;

    @Column()
    last_login_time : number;

    @Column()
    register_time : number;
}