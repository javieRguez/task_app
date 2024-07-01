import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TasksModule } from '../tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminModule } from './firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FirebaseAdminModule,
    TasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
