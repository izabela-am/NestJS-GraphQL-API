import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Field } from '@nestjs/graphql';

import Message from './message.entity';

@Entity()
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @OneToMany(() => Message, message => message.userConnection)

  messageConnection: Promise<Message[]>;
}