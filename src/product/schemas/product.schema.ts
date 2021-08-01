import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Category } from 'src/category/schemas/category.schema';
import { Model } from 'src/model/schemas/model.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  description: string;

  @Prop({ trim: true })
  price: number;

  @Prop({ trim: true })
  cant: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Model' })
  model: Model;

  @Prop({ trim: true })
  status: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
