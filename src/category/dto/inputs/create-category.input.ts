import { IsNotEmpty, Length, Matches } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre de la categoria solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;
}
