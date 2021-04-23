import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoleDocument = Role & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Role {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
