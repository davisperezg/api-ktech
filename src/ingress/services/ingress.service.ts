import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { IngressDocument } from '../schemas/ingress.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { NOEXIST, NULL } from 'src/lib/conts';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
import { CategoryDocument } from 'src/category/schemas/category.schema';
import * as moment from 'moment';

@Injectable()
export class IngressService implements OnModuleInit {
  constructor(
    @InjectModel('Ingress')
    private readonly ingressModel: Model<IngressDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.ingressModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en IngressService.onModuleInit ${e}`);
    }
  }

  async createIngress(
    ingressInput: CreateIngressInput,
  ): Promise<IngressDocument> {
    const { category } = ingressInput;

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const newIngress = new this.ingressModel({
      ...ingressInput,
      category: findCategory._id,
      status: 1,
    });

    let ingressSaved: IngressDocument;
    let foundIngress: IngressDocument;

    try {
      ingressSaved = await newIngress.save();
    } catch (e) {
      throw new Error(`Error en IngressService.createIngress ${e}`);
    }

    try {
      foundIngress = await ingressSaved
        .populate([{ path: 'category' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en IngressService.createIngress.list ${e}`);
    }

    return foundIngress;
  }

  async updateIngress(
    ingressInput: UpdateIngressInput,
  ): Promise<IngressDocument> {
    const { id, category } = ingressInput;

    let findCategory: CategoryDocument;
    let updateIngress: IngressDocument;

    const findIngressById = await this.findOneIngressById(id);

    if (category) {
      findCategory = await this.categoryService.findOneCategoryByName(
        category,
        NOEXIST,
      );
    } else {
      findCategory = await this.categoryService.findOneCategoryByName(
        findIngressById.category.name,
        NULL,
      );
    }

    try {
      updateIngress = await this.ingressModel
        .findByIdAndUpdate(
          id,
          {
            ...ingressInput,
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
      throw new Error(`Error en IngressService.updateIngress ${e}`);
    }

    return updateIngress;
  }

  async deleteIngressById(id: string): Promise<boolean> {
    let result = false;
    await this.findOneIngressById(id);

    try {
      await this.ingressModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en IngressService.deleteIngressById ${e}`);
    }

    return result;
  }

  async findAllIngressToDay(): Promise<IngressDocument[]> {
    let findIngress: IngressDocument[] | any;

    const now = moment.utc().format();
    try {
      findIngress = await this.ingressModel.find({ status: 1 }).populate([
        {
          path: 'category',
        },
      ]);
      //filter with today's date
      findIngress = findIngress
        .map((res: any) => {
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
      throw new Error(`Error en IngressService.findAllIngress ${e}`);
    }

    return findIngress;
  }

  async findOneIngressById(id: string): Promise<IngressDocument> {
    let ingress: IngressDocument;

    try {
      ingress = await this.ingressModel.findById(id).populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en IngressService.findOneIngressById ${e}`);
    }

    //if does not exist
    if (!ingress)
      throw new NotFoundException({
        path: `ingress`,
        message: `El ingreso no se encuentra o no existe`,
      });

    return ingress;
  }
}
