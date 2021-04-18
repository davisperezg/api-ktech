import { Field, InputType } from '@nestjs/graphql';

import {
  IsString,
  IsAlpha,
  IsNotEmpty,
  Length,
  IsEmail,
} from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsAlpha()
  @IsNotEmpty()
  @Length(3, 55)
  name: string;

  @Field()
  @IsAlpha()
  @IsNotEmpty()
  @Length(3, 55)
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(6, 55)
  password: string;
}
