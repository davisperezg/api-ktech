import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type MenuDocument = Menu & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Menu {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true, unique: true })
  link: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
