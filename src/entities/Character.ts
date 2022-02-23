import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm' 
import { Films } from './Films';

@Entity('charakter')
export class Charakter extends BaseEntity {

    @PrimaryColumn()
    id!: number

    @Column({
        unique: true
    })
    name!: string;

    @ManyToMany(
        () => Films
    )
    list!: Films[]
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}