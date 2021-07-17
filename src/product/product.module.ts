import { Module } from '@nestjs/common';
import { BrandSchema } from 'src/brand/schemas/brand.schema';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { ModelSchema } from 'src/model/schemas/model.schema';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductSchema } from './schemas/product.schema';
import { ProductService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { BrandService } from 'src/brand/services/brand.service';
import { ModelService } from 'src/model/services/model.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Brand', schema: BrandSchema },
      { name: 'Model', schema: ModelSchema },
    ]),
  ],
  providers: [
    ProductResolver,
    ProductService,
    CategoryService,
    BrandService,
    ModelService,
  ],
})
export class ProductModule {}
