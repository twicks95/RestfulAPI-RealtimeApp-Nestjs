import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ type: 'integer' })
    // user_type_id: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ select: false, type: 'varchar' }) // exclude password from select query
    password: string;

    // @Column({ type: 'timestamp' })
    // logged_in: Date;

    @Column({ type: 'varchar' })
    user_token: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;
}