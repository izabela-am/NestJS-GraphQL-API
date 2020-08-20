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

  @Mutation(() => Message)
  public async createMessage(@Args('data') input: MessageInput): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      userId: input.userId,
      content: input.content,
    });

    const response = await this.repoService.messageRepo.save(message);
    popSub.publish('messageAdded', { messageAdded: message })

    return response;
  }


  @Mutation(() => Message)@Args('data') input: DeleteMessageInput): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(input.id);

    if (!message || message.userId !== input.userId)
      throw new Error(
        'Message does not exist',
      );

    const copy = { ...message };

    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message, @Context() { UserLoader }: typeof context): Promise<User> {
    return UserLoader.load(parent.userId);
  }
}