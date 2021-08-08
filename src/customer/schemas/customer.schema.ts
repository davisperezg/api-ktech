import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type CustomerDocument = Customer & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Customer {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  lastName: string;

  @Prop({ trim: true, uppercase: true })
  document: string;

  @Prop({ trim: true, uppercase: true })
  numDocument: string;

  @Prop({ trim: true, uppercase: true })
  cellphone_1: string;

  @Prop({ trim: true, uppercase: true })
  cellphone_2?: string;

  @Prop({ trim: true })
  direction?: string;

  @Prop({ trim: true })
  username: string;

  @Prop({ trim: true })
  password: string;

  @Prop({ trim: true })
  status: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
