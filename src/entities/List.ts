import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm' 
import { Films } from './Films';

@Entity('list')
export class List extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true
    })
    name!: string;
    
    @ManyToMany(
        () => Films
    )
    @JoinTable({
        name: "list_flims",
        joinColumn: {
            name: "list",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "films",
            referencedColumnName: 'id'
        }
    })
    films!: Films[];


    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}