import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Administrator {
    @PrimaryColumn()
    user_id : number;

    @Column()
    account : string;

    @Column()
    password : string;

    @Column()
    salt : string;

    @Column()
    name : string;

    @Column()
    super : number;

    @Column()
    status : number;
}