import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';
import { AccessModule } from './access/access.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ProductModule } from './product/product.module';
import { ServiceModule } from './service/service.module';
import { IngressModule } from './ingress/ingress.module';
import { EgressModule } from './egress/egress.module';

//mongodb://localhost

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dperez:dapeor@cluster0.xe1tm.mongodb.net/KTECH?retryWrites=true&w=majority',
      {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    AccessModule,
    MenuModule,
    ModulesModule,
    RoleModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    ModelModule,
    ProductModule,
    ServiceModule,
    IngressModule,
    EgressModule,
  ],
})
export class AppModule {}
