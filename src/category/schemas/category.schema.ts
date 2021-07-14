import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
