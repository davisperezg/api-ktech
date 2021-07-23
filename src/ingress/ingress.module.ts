import { Module } from '@nestjs/common';
import { IngressResolver } from './resolvers/ingress.resolver';
import { IngressService } from './services/ingress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngressSchema } from './schemas/ingress.schema';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { CategoryService } from 'src/category/services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingress', schema: IngressSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [IngressResolver, IngressService, CategoryService],
})
export class IngressModule {}
