import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type AccessDocument = Access & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Access {
  @Prop({ trim: true, unique: true })
  name?: string;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
