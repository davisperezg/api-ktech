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
import { startOfDay, endOfDay, add } from 'date-fns';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class IngressService implements OnModuleInit {
  constructor(
    @InjectModel('Ingress')
    private readonly ingressModel: Model<IngressDocument>,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
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
    const { category, user } = ingressInput;

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const findUser = await this.userService.findOneUserByName(user, NOEXIST);

    const newIngress = new this.ingressModel({
      ...ingressInput,
      category: findCategory._id,
      user: findUser._id,
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
        .populate([{ path: 'category' }, { path: 'user' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en IngressService.createIngress.list ${e}`);
    }

    return foundIngress;
  }

  async updateIngress(
    ingressInput: UpdateIngressInput,
  ): Promise<IngressDocument> {
    const { id, category, user } = ingressInput;

    let findCategory: CategoryDocument;
    let findUser: UserDocument;
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

    if (user) {
      findUser = await this.userService.findOneUserByName(user, NOEXIST);
    } else {
      findUser = await this.userService.findOneUserByName(
        findIngressById.user.name,
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
            user: findUser._id,
          },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
          {
            path: 'user',
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

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    //server
    const toDay = add(todayStart, { days: -1 });
    const toDayEnd = add(todayEnd, { days: -1 });

    try {
      findIngress = await this.ingressModel
        .find({ status: 1, createdAt: { $gte: toDay, $lte: toDayEnd } })
        .populate([
          {
            path: 'category',
          },
          {
            path: 'user',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en IngressService.findAllIngress ${e}`);
    }

    return findIngress;
  }

  async findIngressByDates(
    start: string,
    end: string,
  ): Promise<IngressDocument[]> {
    let findIngress: IngressDocument[] | any;

    const todayStart = startOfDay(new Date(start));
    const addDaytoStart = add(todayStart, { days: -1 });

    const todayEnd = endOfDay(new Date(end));
    const addDaytoEnd = add(todayEnd, { days: -1 });
    console.log(`Ingreso`, addDaytoStart, addDaytoEnd);

    try {
      findIngress = await this.ingressModel
        .find({
          status: 1,
          createdAt: {
            $gte: addDaytoStart,
            $lt: addDaytoEnd,
          },
        })
        .populate([
          {
            path: 'category',
          },
          {
            path: 'user',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en IngressService.findIngressByDates ${e}`);
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
        {
          path: 'user',
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
