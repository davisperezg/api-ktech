import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandService } from 'src/brand/services/brand.service';
import { CategoryService } from 'src/category/services/category.service';
import { ModelService } from 'src/model/services/model.service';
import { ServiceDocument } from 'src/service/schemas/service.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productoModel: Model<ServiceDocument>,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) {}
}
