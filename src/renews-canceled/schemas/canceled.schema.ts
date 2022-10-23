import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Renew } from 'src/renew/schemas/renew.schema';

export type CanceledDocument = Canceled & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Canceled {
  @Prop()
  status: number; //1resuelto - 2revision

  @Prop({ trim: true, uppercase: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Renew' })
  renew: Renew;
}

export const CanceledSchema = SchemaFactory.createForClass(Canceled);
