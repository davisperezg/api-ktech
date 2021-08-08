import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateBillingInput } from '../dto/inputs/create-billing.input';
import { UpdateBillingInput } from '../dto/inputs/update-billing.input';
import { BillingDocument } from '../schemas/billing.schema';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel('Billing')
    private readonly billingModel: Model<BillingDocument>,
  ) {}

  async createBilling(
    billingInput: CreateBillingInput,
  ): Promise<BillingDocument> {
    const { name } = billingInput;

    await this.findOneBillingByName(name, EXIST);

    const newBilling = new this.billingModel({ ...billingInput, status: 1 });

    let saveBilling: BillingDocument;

    try {
      saveBilling = await newBilling.save();
    } catch (e) {
      throw new Error(`Error en BillingService.createBilling ${e}`);
    }

    return saveBilling;
  }

  async updateBilling(
    billingInput: UpdateBillingInput,
  ): Promise<BillingDocument> {
    const { id } = billingInput;

    await this.findOneBillingById(id);

    let updateBilling: BillingDocument;

    try {
      updateBilling = await this.billingModel.findByIdAndUpdate(
        id,
        billingInput,
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en BillingService.updateBilling ${e}`);
    }

    return updateBilling;
  }

  async deleteBilling(id: string): Promise<boolean> {
    let result = false;

    await this.findOneBillingById(id);

    try {
      await this.billingModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en BillingService.deleteBilling ${e}`);
    }

    return result;
  }

  async findAllBilling(): Promise<BillingDocument[]> {
    let findBilling: BillingDocument[];

    try {
      findBilling = await this.billingModel.find({ status: 1 });
    } catch (e) {
      throw new Error(`Error en BillingService.findAllBilling ${e}`);
    }

    return findBilling;
  }

  async findOneBillingById(id: string): Promise<BillingDocument> {
    let billing: BillingDocument;

    try {
      billing = await this.billingModel.findById(id);
    } catch (e) {
      throw new Error(`Error en BillingService.findOneBillingById ${e}`);
    }

    //if does not exist
    if (!billing)
      throw new BadRequestException({
        path: 'billing',
        message: [`El plan de facturación no se encuentra o no existe`],
      });

    return billing;
  }

  async findOneBillingByName(
    name: string,
    param: string,
  ): Promise<BillingDocument> {
    let billing: BillingDocument;

    try {
      billing = await this.billingModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en BillingService.findOneBillingByName ${e}`);
    }

    switch (param) {
      case EXIST:
        if (billing)
          throw new BadRequestException({
            path: 'billing',
            message: [`El plan de facturación ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!billing)
          throw new BadRequestException({
            path: 'billing',
            message: [`La plan de facturación no existe.`],
          });
        break;

      case NULL:
        return billing;
    }

    return billing;
  }
}
