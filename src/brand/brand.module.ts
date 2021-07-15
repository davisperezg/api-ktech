import { Module } from '@nestjs/common';
import { BrandResolver } from './resolvers/brand.resolver';
import { BrandService } from './services/brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './schemas/brand.schema';
import { CategoryService } from 'src/category/services/category.service';
import { CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Brand', schema: BrandSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [BrandResolver, BrandService, CategoryService],
})
export class BrandModule {}
