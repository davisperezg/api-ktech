import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BrandDocument } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateBrandInput } from '../dto/inputs/create-brand.input';
import { UpdateBrandInput } from '../dto/inputs/update-brand.input';
import { CategoryDocument } from 'src/category/schemas/category.schema';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand')
    private readonly brandModel: Model<BrandDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async createBrand(brandInput: CreateBrandInput): Promise<BrandDocument> {
    const { name, category } = brandInput;

    await this.findOneBrandByName(name, EXIST);

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const newBrand = new this.brandModel({
      ...brandInput,
      category: findCategory._id,
    });

    let brandSaved: BrandDocument;
    let foundBrand: BrandDocument;

    try {
      brandSaved = await newBrand.save();
    } catch (e) {
      throw new Error(`Error en BrandService.createBrand ${e}`);
    }

    try {
      foundBrand = await brandSaved.populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en BrandService.createBrand.list ${e}`);
    }

    return foundBrand;
  }

  async updateBrand(brandInput: UpdateBrandInput): Promise<BrandDocument> {
    const { id, category } = brandInput;

    let findCategory: CategoryDocument;
    let updateBrand: BrandDocument;

    const findBrandById = await this.findOneBrandById(id);

    if (category) {
      findCategory = await this.categoryService.findOneCategoryByName(
        category,
        NOEXIST,
      );
    } else {
      findCategory = await this.categoryService.findOneCategoryByName(
        findBrandById.category.name,
        NULL,
      );
    }

    try {
      updateBrand = await this.brandModel
        .findByIdAndUpdate(
          id,
          { ...brandInput, category: findCategory._id },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en BrandService.updateBrand ${e}`);
    }

    return updateBrand;
  }

  async findAllBrands(): Promise<BrandDocument[]> {
    let findBrand: BrandDocument[];
    try {
      findBrand = await this.brandModel.find().populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en BrandService.findAllBrands ${e}`);
    }

    return findBrand;
  }

  async findOneBrandById(id: string): Promise<BrandDocument> {
    let brand: BrandDocument;

    try {
      brand = await this.brandModel.findById(id).populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en BrandService.findOneBrandById ${e}`);
    }

    //if does not exist
    if (!brand)
      throw new NotFoundException(`La marca no se encuentra o no existe`);

    return brand;
  }

  async findOneBrandByName(
    name: string,
    param: string,
  ): Promise<BrandDocument> {
    let brand: BrandDocument;

    try {
      brand = await this.brandModel.findOne({ name });
    } catch (e) {
      throw new BadRequestException({
        path: 'brand',
        message: [`La marca ${name} ya existe.`],
      });
    }

    switch (param) {
      case EXIST:
        if (brand)
          throw new BadRequestException({
            path: 'brand',
            message: [`La marca ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!brand)
          throw new BadRequestException({
            path: 'brand',
            message: [`La marca no existe.`],
          });

      case NULL:
        return brand;
    }

    return brand;
  }
}
