import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Billing } from 'src/billing/schemas/billing.schema';
import { User } from 'src/user/schemas/user.schema';
import { Vehicle } from 'src/vehicle/schemas/vehicle.schema';
export type RenewDocument = Renew & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Renew {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Billing' })
  billing: Billing;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  registeredBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: User;

  @Prop({ trim: true })
  expirationDate: Date;

  @Prop({ trim: true })
  renovationStart: Date;

  @Prop({ trim: true })
  renovationEnd: Date;

  @Prop({ trim: true })
  status: number; //1-correcto, 2-revision

  @Prop({ trim: true })
  billingPayToday: string;

  @Prop({ trim: true })
  billingDes: string;

  @Prop()
  billingTime: [];
}

export const RenewSchema = SchemaFactory.createForClass(Renew);
