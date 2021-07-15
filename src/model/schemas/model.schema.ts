import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Brand } from 'src/brand/schemas/brand.schema';

export type ModelDocument = Model & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Model {
  @Prop({ trim: true, unique: true, uppercase: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
