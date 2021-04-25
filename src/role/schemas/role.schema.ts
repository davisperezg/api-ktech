import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { Module } from 'src/modules/schemas/module.schema';

export type RoleDocument = Role & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Role {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }] })
  modules: Module[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
