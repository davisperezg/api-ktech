import { Module } from '@nestjs/common';
import { ModelResolver } from './resolvers/model.resolver';
import { ModelService } from './services/model.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelSchema } from './schemas/model.schema';
import { BrandSchema } from 'src/brand/schemas/brand.schema';
import { BrandService } from 'src/brand/services/brand.service';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { CategoryService } from 'src/category/services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Model', schema: ModelSchema },
      { name: 'Brand', schema: BrandSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [ModelResolver, ModelService, BrandService, CategoryService],
})
export class ModelModule {}
