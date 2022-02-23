import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm' 
import { Charakter } from './Character';
import { List } from './List';

@Entity('films')
export class Films extends BaseEntity {

    @PrimaryColumn()
    id!: number

    @Column({
        unique: true
    })
    title!: string;
    
    @Column()
    releseDate!: string;

    @ManyToMany(
        () => List
    )
    list!: List[]

    @ManyToMany(
        () => Charakter
    )
    @JoinTable({
        name: "films_charakter",
        joinColumn: {
            name: "films",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "charakter",
            referencedColumnName: 'id'
        }
    })
    charakter!: Charakter[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}