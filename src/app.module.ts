import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/orm.config';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { MemberModule } from './member/member.module';
import { EventModule } from './event/event.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground:false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }: { req: any }) => ({ req }),
    }),
    AuthModule,
    ClubModule,
    MemberModule,
    EventModule,
  ],
})
export class AppModule {}
