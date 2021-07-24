import { Injectable, NotFoundException } from '@nestjs/common';
import { EgressDocument } from '../schemas/egress.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { CategoryService } from 'src/category/services/category.service';
import { NOEXIST, NULL } from 'src/lib/conts';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
import { CategoryDocument } from 'src/category/schemas/category.schema';

@Injectable()
export class EgressService {
  constructor(
    @InjectModel('Egress')
    private readonly egressModel: Model<EgressDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async createEgress(egressInput: CreateEgressInput): Promise<EgressDocument> {
    const { category } = egressInput;

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const newEgress = new this.egressModel({
      ...egressInput,
      category: findCategory._id,
    });

    let egressSaved: EgressDocument;
    let foundEgress: EgressDocument;

    try {
      egressSaved = await newEgress.save();
    } catch (e) {
      throw new Error(`Error en EgressService.createEgress ${e}`);
    }

    try {
      foundEgress = await egressSaved
        .populate([{ path: 'category' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en EgressService.createEgress.list ${e}`);
    }

    return foundEgress;
  }

  async updateEgress(egressInput: UpdateEgressInput): Promise<EgressDocument> {
    const { id, category } = egressInput;

    let findCategory: CategoryDocument;
    let updateEgress: EgressDocument;

    const findEgressById = await this.findOneEgressById(id);

    if (category) {
      findCategory = await this.categoryService.findOneCategoryByName(
        category,
        NOEXIST,
      );
    } else {
      findCategory = await this.categoryService.findOneCategoryByName(
        findEgressById.category.name,
        NULL,
      );
    }

    try {
      updateEgress = await this.egressModel
        .findByIdAndUpdate(
          id,
          {
            ...egressInput,
            category: findCategory._id,
          },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en EgressService.updateEgress ${e}`);
    }

    return updateEgress;
  }

  async deleteEgressById(id: string): Promise<boolean> {
    let result = false;
    await this.findOneEgressById(id);

    try {
      await this.egressModel.findByIdAndDelete(id);
      result = true;
    } catch (e) {
      throw new Error(`Error en EgressService.deleteEgressById ${e}`);
    }

    return result;
  }

  async findAllEgress(): Promise<EgressDocument[]> {
    let findEgress: EgressDocument[];

    try {
      findEgress = await this.egressModel.find().populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en EgressService.findAllEgress ${e}`);
    }

    return findEgress;
  }

  async findOneEgressById(id: string): Promise<EgressDocument> {
    let egress: EgressDocument;

    try {
      egress = await this.egressModel.findById(id).populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en EgressService.findOneEgressById ${e}`);
    }

    //if does not exist
    if (!egress)
      throw new NotFoundException({
        path: `egress`,
        message: `El egreso no se encuentra o no existe`,
      });

    return egress;
  }
}
