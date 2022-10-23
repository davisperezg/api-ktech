import { CanceledDocument } from '../schemas/canceled.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCanceledInput } from '../dto/inputs/create-canceled.input';
import { UpdateCanceledInput } from '../dto/inputs/update-canceled.input';
import { Model } from 'mongoose';
import { RenewDocument } from 'src/renew/schemas/renew.schema';

@Injectable()
export class CanceledService {
  constructor(
    @InjectModel('Canceled')
    private readonly canceledModel: Model<CanceledDocument>,
    @InjectModel('Renew')
    private readonly renewModel: Model<RenewDocument>,
  ) {}

  async createCanceled(
    canceledInput: CreateCanceledInput,
  ): Promise<CanceledDocument> {
    const newCanceled = new this.canceledModel({ ...canceledInput, status: 2 });

    let saveCanceled: CanceledDocument;

    try {
      saveCanceled = await newCanceled.save();
    } catch (e) {
      throw new Error(`Error en CanceledService.createCanceled ${e}`);
    }

    return saveCanceled;
  }

  async updateCanceled(
    canceledInput: UpdateCanceledInput,
  ): Promise<CanceledDocument> {
    const { id } = canceledInput;

    let updateCanceled: CanceledDocument;

    const getRenew = await this.renewModel.findById(canceledInput.renew);

    const toData = {
      status: canceledInput.status,
      message: canceledInput.message,
      renew: getRenew._id,
    };

    try {
      updateCanceled = await this.canceledModel.findByIdAndUpdate(id, toData, {
        new: true,
      });
    } catch (e) {
      throw new Error(`Error en CanceledService.updateCanceled ${e}`);
    }

    return updateCanceled;
  }

  async findOneCanceledById(id: string): Promise<CanceledDocument> {
    let canceled: CanceledDocument;

    try {
      canceled = await this.canceledModel.findById(id);
    } catch (e) {
      throw new Error(`Error en DeviceService.findOneCanceledById ${e}`);
    }

    //if does not exist
    if (!canceled)
      throw new BadRequestException({
        path: 'canceled',
        message: [`La renoación no se encuentra o no existe`],
      });

    return canceled;
  }
}
