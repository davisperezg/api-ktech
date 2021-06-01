import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';
import { AccessModule } from './access/access.module';
import { AccessService } from './access/services/access.service';
import { MenuModule } from './menu/menu.module';

//mongodb+srv://dperez:dapeor@cluster0.xe1tm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    RoleModule,
    AuthModule,
    UserModule,
    ModulesModule,
    AccessModule,
    MenuModule,
  ],
})
export class AppModule {}
