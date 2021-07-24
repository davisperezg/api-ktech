import { Injectable, NotFoundException } from '@nestjs/common';
import { IngressDocument } from '../schemas/ingress.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { NOEXIST, NULL } from 'src/lib/conts';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
import { CategoryDocument } from 'src/category/schemas/category.schema';

@Injectable()
export class IngressService {
  constructor(
    @InjectModel('Ingress')
    private readonly ingressModel: Model<IngressDocument>,
    private readonly categoryService: CategoryService,
  ) {}

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
      await this.ingressModel.findByIdAndDelete(id);
      result = true;
    } catch (e) {
      throw new Error(`Error en IngressService.deleteIngressById ${e}`);
    }

    return result;
  }

  async findAllIngress(): Promise<IngressDocument[]> {
    let findIngress: IngressDocument[];

    try {
      findIngress = await this.ingressModel.find().populate([
        {
          path: 'category',
        },
      ]);
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
