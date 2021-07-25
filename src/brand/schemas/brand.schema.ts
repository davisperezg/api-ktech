import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type BrandDocument = Brand & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Brand {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ trim: true })
  status: number;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
