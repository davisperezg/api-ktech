import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type ModuleDocument = Module & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Module {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
