import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import ormConfig from './config/orm';
import { context } from './db/loaders'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import MessageResolver from './resolvers/message.resolver';
import UserResolver from './resolvers/user.resolver';

const graphQLImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig), RepoModule, ...graphQLImports, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
    installSubscriptionHandlers: true,
    context,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
