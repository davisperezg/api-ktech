import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateCategoryInput } from '../dto/inputs/create-category.input';
import { UpdateCategoryInput } from '../dto/inputs/update-category.input';
import { CategoryDocument } from '../schemas/category.schema';
@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.categoryModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en CategoryService.onModuleInit ${e}`);
    }
  }

  async createCategory(
    categoryInput: CreateCategoryInput,
  ): Promise<CategoryDocument> {
    const { name } = categoryInput;

    await this.findOneCategoryByName(name, EXIST);

    const newCategory = new this.categoryModel({ ...categoryInput, status: 1 });

    let saveCategory: CategoryDocument;

    try {
      saveCategory = await newCategory.save();
    } catch (e) {
      throw new Error(`Error en CategoryService.createCategory ${e}`);
    }

    return saveCategory;
  }

  async updateCategory(
    categoryInput: UpdateCategoryInput,
  ): Promise<CategoryDocument> {
    await this.findOneCategoryById(categoryInput.id);

    let updateCategory: CategoryDocument;

    try {
      updateCategory = await this.categoryModel.findByIdAndUpdate(
        categoryInput.id,
        categoryInput,
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en CategoryService.updateCategory ${e}`);
    }

    return updateCategory;
  }

  async findAllCategory(): Promise<CategoryDocument[]> {
    let findCategorys: CategoryDocument[];

    try {
      findCategorys = await this.categoryModel.find({ status: 1 });
    } catch (e) {
      throw new Error(`Error en CategoryService.findAllCategory ${e}`);
    }

    return findCategorys;
  }

  async findOneCategoryByName(
    name: string,
    param: string,
  ): Promise<CategoryDocument> {
    let category: CategoryDocument;

    try {
      category = await this.categoryModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en CategoryService.findOneCategoryByName ${e}`);
    }

    switch (param) {
      case EXIST:
        if (category)
          throw new BadRequestException({
            path: 'category',
            message: [`La categoria ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!category)
          throw new BadRequestException({
            path: 'category',
            message: [`La categoria no existe.`],
          });
        break;

      case NULL:
        return category;
    }

    return category;
  }

  async findOneCategoryById(id: string): Promise<CategoryDocument> {
    let category: CategoryDocument;

    try {
      category = await this.categoryModel.findById(id);
    } catch (e) {
      throw new Error(`Error en MenuService.findOneMenuById ${e}`);
    }

    //if does not exist
    if (!category)
      throw new BadRequestException({
        path: 'category',
        message: [`La categoria no se encuentra o no existe`],
      });

    return category;
  }
}
