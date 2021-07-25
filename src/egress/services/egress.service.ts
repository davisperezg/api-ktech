import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { EgressDocument } from '../schemas/egress.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { CategoryService } from 'src/category/services/category.service';
import { NOEXIST, NULL } from 'src/lib/conts';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
import { CategoryDocument } from 'src/category/schemas/category.schema';
import * as moment from 'moment';

@Injectable()
export class EgressService implements OnModuleInit {
  constructor(
    @InjectModel('Egress')
    private readonly egressModel: Model<EgressDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.egressModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en EgressService.onModuleInit ${e}`);
    }
  }

  async createEgress(egressInput: CreateEgressInput): Promise<EgressDocument> {
    const { category } = egressInput;

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const newEgress = new this.egressModel({
      ...egressInput,
      category: findCategory._id,
      status: 1,
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
      await this.egressModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en EgressService.deleteEgressById ${e}`);
    }

    return result;
  }

  async findAllEgressToDay(): Promise<EgressDocument[]> {
    let findEgress: EgressDocument[] | any;

    const now = moment.utc().format();
    try {
      findEgress = await this.egressModel.find({ status: 1 }).populate([
        {
          path: 'category',
        },
      ]);
      //filter with today's date
      findEgress = findEgress
        .map((res: any) => {
          //moment.utc().format();
          //moment.utc(date).local().format('DD/MM/YYYY');
          return {
            id: res._id,
            detail: res.detail,
            observation: res.observation,
            units: res.units,
            amount: res.amount,
            createdAt: moment.utc(res.createdAt).local().format('DD/MM/YYYY'),
            updatedAt: moment.utc(res.updatedAt).local().format('DD/MM/YYYY'),
            category: {
              name: res.category.name,
            },
          };
        })
        .filter(
          (fil) =>
            fil.createdAt === moment.utc(now).local().format('DD/MM/YYYY'),
        );
    } catch (e) {
      throw new Error(`Error en EgressService.findAllEgress ${e}`);
    }

    return findEgress;
  }

  async findAllEgress(): Promise<EgressDocument[]> {
    let findEgress: EgressDocument[];

    try {
      findEgress = await this.egressModel.find({ status: 1 }).populate([
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
