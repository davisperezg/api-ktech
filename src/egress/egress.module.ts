import { CategorySchema } from './../category/schemas/category.schema';
import { Module } from '@nestjs/common';
import { EgressResolver } from './resolvers/egress.resolver';
import { EgressSchema } from './schemas/egress.schema';
import { EgressService } from './services/egress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Egress', schema: EgressSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [EgressResolver, EgressService, CategoryService],
})
export class EgressModule {}
