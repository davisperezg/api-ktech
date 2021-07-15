import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ServiceDocument = Service & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Service {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
