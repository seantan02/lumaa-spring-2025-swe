
/*
This module contains all the ORM models definition for typeorm
*/

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })  // Username unique
    username!: string;

    @Column()
    password!: string;

    @OneToMany(() => Task, (task) => task.user, {
        lazy: true,
    })
    tasks: Task[] = [];
}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })  // optional
    description: string = "";

    @Column({ default: false })
    isComplete: boolean = false;

    @ManyToOne(() => User, (user) => user.tasks, {
        onDelete: 'CASCADE', // Delete tasks when user is deleted
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: "id" })
    user!: User;
}