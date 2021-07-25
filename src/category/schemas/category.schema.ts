import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ trim: true })
  status: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
