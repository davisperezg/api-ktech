import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDocument } from 'src/brand/schemas/brand.schema';
import { BrandService } from 'src/brand/services/brand.service';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateModelInput } from '../dto/inputs/create-model.input';
import { UpdateModelInput } from '../dto/inputs/update-model.input';
import { ModelDocument } from '../schemas/model.schema';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel('Model')
    private readonly modelModel: Model<ModelDocument>,
    private readonly brandService: BrandService,
  ) {}

  async createModel(modelInput: CreateModelInput): Promise<ModelDocument> {
    const { name, brand } = modelInput;

    await this.findOneModelByName(name, EXIST);

    const findBrand = await this.brandService.findOneBrandByName(
      brand,
      NOEXIST,
    );

    const newModel = new this.modelModel({
      ...modelInput,
      brand: findBrand._id,
    });

    let modelSaved: ModelDocument;
    let foundModel: ModelDocument;

    try {
      modelSaved = await newModel.save();
    } catch (e) {
      throw new Error(`Error en ModelService.createModel ${e}`);
    }

    try {
      foundModel = await modelSaved
        .populate([{ path: 'brand' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en ModelService.createModel.list ${e}`);
    }

    return foundModel;
  }

  async updateModel(modelInput: UpdateModelInput): Promise<ModelDocument> {
    const { id, brand } = modelInput;

    let findBrand: BrandDocument;
    let updateModel: ModelDocument;

    const findModelById = await this.findOneModelById(id);

    if (brand) {
      findBrand = await this.brandService.findOneBrandByName(brand, NOEXIST);
    } else {
      findBrand = await this.brandService.findOneBrandByName(
        findModelById.brand.name,
        NULL,
      );
    }

    try {
      updateModel = await this.modelModel
        .findByIdAndUpdate(
          id,
          { ...modelInput, brand: findBrand._id },
          { new: true },
        )
        .populate([
          {
            path: 'brand',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en ModelService.updateModel ${e}`);
    }

    return updateModel;
  }

  async findAllModels(): Promise<ModelDocument[]> {
    let findModel: ModelDocument[];
    try {
      findModel = await this.modelModel.find().populate([
        {
          path: 'brand',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ModelService.findAllModels ${e}`);
    }

    return findModel;
  }

  async findModelsByBrand(brand: string): Promise<ModelDocument[]> {
    let models: ModelDocument[];

    try {
      models = await this.modelModel.find().populate({
        path: 'brand',
        match: {
          name: brand,
        },
      });

      models = models.filter((model) => model.brand !== null);
    } catch (e) {
      throw new Error(`Error en ModelService.findModelsByBrand ${e}`);
    }

    return models;
  }

  async findOneModelById(id: string): Promise<ModelDocument> {
    let model: ModelDocument;

    try {
      model = await this.modelModel.findById(id).populate([
        {
          path: 'brand',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ModelService.findOneModelById ${e}`);
    }

    //if does not exist
    if (!model)
      throw new NotFoundException(`El modelo no se encuentra o no existe`);

    return model;
  }

  async findOneModelByName(
    name: string,
    param: string,
  ): Promise<ModelDocument> {
    let model: ModelDocument;

    try {
      model = await this.modelModel.findOne({ name });
    } catch (e) {
      throw new BadRequestException({
        path: 'brand',
        message: [`La marca ${name} ya existe.`],
      });
    }

    switch (param) {
      case EXIST:
        if (model)
          throw new BadRequestException({
            path: 'model',
            message: [`El modelo ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!model)
          throw new BadRequestException({
            path: 'model',
            message: [`El modelo no existe.`],
          });
        break;
    }

    return model;
  }
}
