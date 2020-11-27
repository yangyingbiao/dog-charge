import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Test {
    @PrimaryColumn()
    id : number;

    @Column()
    content1 : string;

    @Column()
    content2 : string;

    @Column()
    content3 : string;

    @Column()
    content4 : string;

    @Column()
    content5 : string;

    @Column()
    create_time : number;
}