import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'src/model/schemas/model.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Model' })
  model: Model;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
