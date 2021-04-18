import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: process.env.MONGO_INITDB_ROOT_USERNAME,
      // password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      database: 'test-ktech',
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    RoleModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
