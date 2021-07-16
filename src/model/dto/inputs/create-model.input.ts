import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateModelInput {
  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre solo puede contener letras, numeros y guiones',
  })
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar el nombre' })
  name: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  @IsNotEmpty({ message: 'Debe completar la marca' })
  brand: string;
}
