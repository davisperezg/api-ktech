import { IsNotEmpty, Length, Matches } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre de la categoria solo puede contener letras',
  })
  @IsNotEmpty({ message: 'Debe completar el nombre' })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  name: string;
}
