import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ServiceDocument = Service & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Service {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  description: string;

  @Prop({ trim: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ trim: true })
  status: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
