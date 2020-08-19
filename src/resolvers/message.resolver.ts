import { Args, Mutation, Query, Resolver, Parent, ResolveField, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { context } from 'src/db/loaders';
import Message from '../db/models/message.entity';
import RepoService from '../repo.service';
import MessageInput, { DeleteMessageInput } from './input/message.input';
import User from '../db/models/user.entity';

export const pubSub = new PubSub();

@Resolver(() => Message)
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(@Args('userId') userId: number): Promise<Message[]> {
    return this.repoService.messageRepo.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }
}