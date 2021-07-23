import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type IngressDocument = Ingress & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Ingress {
  @Prop({ trim: true, uppercase: true })
  detail: string;

  @Prop({ trim: true })
  observation?: string;

  @Prop({ trim: true })
  units: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ trim: true })
  amount: number;
}

export const IngressSchema = SchemaFactory.createForClass(Ingress);
