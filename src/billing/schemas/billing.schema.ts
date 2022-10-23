import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type BillingDocument = Billing & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Billing {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true })
  day: number;

  @Prop({ trim: true })
  status: number;

  @Prop({ type: Number })
  price: number;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
