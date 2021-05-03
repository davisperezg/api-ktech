import { Access } from './../../access/schemas/access.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Menu } from 'src/menu/schemas/menu.schema';

export type ModuleDocument = Module & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Module {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Access' }] })
  // access?: Access[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
  menus: Menu[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
