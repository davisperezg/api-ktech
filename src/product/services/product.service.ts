import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDocument } from 'src/brand/schemas/brand.schema';
import { BrandService } from 'src/brand/services/brand.service';
import { CategoryDocument } from 'src/category/schemas/category.schema';
import { CategoryService } from 'src/category/services/category.service';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { ModelDocument } from 'src/model/schemas/model.schema';
import { ModelService } from 'src/model/services/model.service';
import { CreateProductInput } from '../dto/inputs/create-product.input';
import { UpdateProductInput } from '../dto/inputs/update-product.input';
import { ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly modelService: ModelService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.productModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en ProductService.onModuleInit ${e}`);
    }
  }

  async createProduct(
    productInput: CreateProductInput,
  ): Promise<ProductDocument> {
    const { name, category, brand, model } = productInput;

    await this.findOneProductByName(name, EXIST);

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const findBrand = await this.brandService.findOneBrandByName(
      brand,
      NOEXIST,
    );

    const findModel = await this.modelService.findOneModelByName(
      model,
      NOEXIST,
    );

    const newProduct = new this.productModel({
      ...productInput,
      category: findCategory._id,
      brand: findBrand._id,
      model: findModel._id,
    });

    let productSaved: ProductDocument;
    let foundProduct: ProductDocument;

    try {
      productSaved = await newProduct.save();
    } catch (e) {
      throw new Error(`Error en ProductService.createProduct ${e}`);
    }

    try {
      foundProduct = await productSaved
        .populate([{ path: 'category' }, { path: 'brand' }, { path: 'model' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en ProductService.createProduct.list ${e}`);
    }

    return foundProduct;
  }

  async updateProduct(
    productInput: UpdateProductInput,
  ): Promise<ProductDocument> {
    const { id, category, brand, model } = productInput;

    let findCategory: CategoryDocument;
    let findBrand: BrandDocument;
    let findModel: ModelDocument;
    let updateProduct: ProductDocument;

    const findProductById = await this.findOneProductById(id);

    if (category) {
      findCategory = await this.categoryService.findOneCategoryByName(
        category,
        NOEXIST,
      );
    } else {
      findCategory = await this.categoryService.findOneCategoryByName(
        findProductById.category.name,
        NULL,
      );
    }

    if (brand) {
      findBrand = await this.brandService.findOneBrandByName(brand, NOEXIST);
    } else {
      findBrand = await this.brandService.findOneBrandByName(
        findProductById.brand.name,
        NULL,
      );
    }

    if (model) {
      findModel = await this.modelService.findOneModelByName(model, NOEXIST);
    } else {
      findModel = await this.modelService.findOneModelByName(
        findProductById.model.name,
        NULL,
      );
    }

    try {
      updateProduct = await this.productModel
        .findByIdAndUpdate(
          id,
          {
            ...productInput,
            category: findCategory._id,
            brand: findBrand._id,
            model: findModel._id,
          },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
          {
            path: 'brand',
          },
          {
            path: 'model',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en ProductService.updateProduct ${e}`);
    }

    return updateProduct;
  }

  async deleteProductById(id: string): Promise<boolean> {
    let result = false;
    await this.findOneProductById(id);

    try {
      await this.productModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en ProductService.deleteProductById ${e}`);
    }

    return result;
  }

  async findAllProducts(): Promise<ProductDocument[]> {
    let findProduct: ProductDocument[];
    try {
      findProduct = await this.productModel.find({ status: 1 }).populate([
        {
          path: 'category',
        },
        {
          path: 'brand',
        },
        {
          path: 'model',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ProductService.findAllProducts ${e}`);
    }

    return findProduct;
  }

  async findOneProductById(id: string): Promise<ProductDocument> {
    let product: ProductDocument;

    try {
      product = await this.productModel.findById(id).populate([
        {
          path: 'category',
        },
        {
          path: 'brand',
        },
        {
          path: 'model',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ProductService.findOneProductById ${e}`);
    }

    //if does not exist
    if (!product)
      throw new NotFoundException({
        path: `product`,
        message: `El producto no se encuentra o no existe`,
      });

    return product;
  }

  async findOneProductByName(
    name: string,
    param: string,
  ): Promise<ProductDocument> {
    let product: ProductDocument;

    try {
      product = await this.productModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en ServiceService.findOneServiceByName${e}`);
    }

    switch (param) {
      case EXIST:
        if (product)
          throw new BadRequestException({
            path: 'product',
            message: [`El producto ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!product)
          throw new BadRequestException({
            path: 'product',
            message: [`El producto no existe.`],
          });
        break;
    }

    return product;
  }
}
