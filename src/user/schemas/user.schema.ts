import { Role } from 'src/role/schemas/role.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

//@Entity('User')
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  lastName: string;

  @Prop({ trim: true, lowercase: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  confirmPassword: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ trim: true })
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
