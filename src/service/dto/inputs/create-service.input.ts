import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsNumber, Length, Matches } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  @IsNotEmpty({ message: 'Debe completar la categoria' })
  category: string;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y numeros',
  })
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar el servicio' })
  name: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y numeros',
  })
  @Length(3, 55, { message: 'La descripción debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar la descripción del servicio' })
  description?: string;

  @Field()
  @IsNumber({}, { message: 'Solo números.' })
  @IsNotEmpty({ message: 'Debe completar el precio del servicio' })
  price: number;
}
