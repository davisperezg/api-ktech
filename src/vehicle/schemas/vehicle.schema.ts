import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Billing } from 'src/billing/schemas/billing.schema';
import { Customer } from 'src/customer/schemas/customer.schema';
import { Device } from 'src/device/schemas/device.schema';

export type VehicleDocument = Vehicle & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Vehicle {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device' })
  device: Device;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Billing' })
  billing: Billing;

  @Prop({ trim: true, uppercase: true })
  plate: string;

  @Prop({ trim: true, uppercase: true })
  nroGPS: string;

  @Prop({ trim: true })
  billigStart: Date;

  @Prop({ trim: true })
  billigEnd: Date;

  @Prop({ trim: true })
  status: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
