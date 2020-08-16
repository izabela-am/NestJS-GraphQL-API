import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import User from './user.entity';

@ObjectType()
@Entity({ name: 'messages' })
export default class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ name: 'user_id' })
  userId: number;

  @Field()
  @UpdateDateColumn({ name: 'created_at' })
  createdAt: number;

  @Field()
  @Column({ name: 'updated_at' })
  updatedAt: number;

  @Field(() => User)
  user: User;

  @ManyToOne(() => User, user => user.messageConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}