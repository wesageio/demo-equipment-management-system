import { Entity, CreateDateColumn, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('organizations')
export class Organizations {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    location: string;

    @Column()
    website: string;

    @Column()
    workers: number;

    @Column()
    cost: number;

    @Column()
    price: number;

    @Column()
    risk: number;

    @Column()
    duration: number;

    @Column()
    margin: string;

    @Column()
    totalMargin: string;

    @Column()
    authorId: string;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;
}
