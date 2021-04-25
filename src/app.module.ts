import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dperez:dapeor@cluster0.xe1tm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    RoleModule,
    AuthModule,
    UserModule,
    ModulesModule,
  ],
})
export class AppModule {}
