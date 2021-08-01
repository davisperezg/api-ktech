import { Field, InputType } from '@nestjs/graphql';

import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty({ message: 'Debe completar la categoria' })
  category: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completar la marca' })
  brand: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completar el modelo' })
  model: string;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y numeros',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el producto' })
  name: string;

  @Field({ nullable: true })
  @Matches(/^[^$%&|<>#]*$/, {
    message: 'La descripción permite solo algunos caracteres permitidos',
  })
  @Length(3, 500, {
    message: 'La descripción debe tener entre 3-500 caracteres.',
  })
  @IsOptional()
  description?: string;

  @Field()
  @IsNumber({}, { message: 'El precio solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar el precio del producto' })
  price: number;

  @Field()
  @IsNumber({}, { message: 'La cantidad solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar la cantidad producto' })
  cant: number;
}
