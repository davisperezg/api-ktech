import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type DeviceDocument = Device & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Device {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true })
  status: number;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
