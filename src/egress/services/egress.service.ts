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
import { startOfDay, endOfDay, add } from 'date-fns';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class EgressService implements OnModuleInit {
  constructor(
    @InjectModel('Egress')
    private readonly egressModel: Model<EgressDocument>,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.egressModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en EgressService.onModuleInit ${e}`);
    }
  }

  async createEgress(egressInput: CreateEgressInput): Promise<EgressDocument> {
    const { user } = egressInput;

    const findUser = await this.userService.findOneUserByName(user, NOEXIST);

    const newEgress = new this.egressModel({
      ...egressInput,
      user: findUser._id,
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
        .populate([{ path: 'category' }, { path: 'user' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en EgressService.createEgress.list ${e}`);
    }

    return foundEgress;
  }

  async updateEgress(egressInput: UpdateEgressInput): Promise<EgressDocument> {
    const { id, category, user } = egressInput;

    let findUser: UserDocument;
    let updateEgress: EgressDocument;

    const findEgressById = await this.findOneEgressById(id);

    const findCategory = await this.categoryService.findOneCategoryById(
      category,
    );

    if (user) {
      findUser = await this.userService.findOneUserByName(user, NOEXIST);
    } else {
      findUser = await this.userService.findOneUserByName(
        findEgressById.user.name,
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
            user: findUser._id,
          },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
          { path: 'user' },
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

    //const today = moment().startOf('day');
    //const tomorrow = moment(today).endOf('day');
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    try {
      findEgress = await this.egressModel
        .find({
          status: 1,
          createdAt: { $gte: todayStart, $lte: todayEnd },
        })
        .populate([
          {
            path: 'category',
          },
          { path: 'user' },
        ]);
    } catch (e) {
      throw new Error(`Error en EgressService.findAllEgress ${e}`);
    }

    return findEgress;
  }

  async findEgressByDates(
    start: string,
    end: string,
  ): Promise<EgressDocument[]> {
    let findEgress: EgressDocument[] | any;

    const todayStart = startOfDay(new Date(start));
    const addDaytoStart = add(todayStart, { days: 1 });

    const todayEnd = endOfDay(new Date(end));
    const addDaytoEnd = add(todayEnd, { days: 1 });

    try {
      findEgress = await this.egressModel
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
          { path: 'user' },
        ]);
    } catch (e) {
      throw new Error(`Error en EgressService.findEgressByDates ${e}`);
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
        { path: 'user' },
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
        { path: 'user' },
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
