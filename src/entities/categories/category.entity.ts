import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ unique: true })
    slug!: string

    @Column()
    name!: string

    @Column({ nullable: true })
    description?: string

    @Column({ 
        default: new Date(),
        type: 'timestamp'
    })
    createdDate!: Date

    @Column()
    active!: boolean
}