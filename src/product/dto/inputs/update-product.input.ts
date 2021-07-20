import { Field, InputType, ID } from '@nestjs/graphql';

import {
  IsNumber,
  IsOptional,
  Length,
  Matches,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del usuario no es válido' })
  @IsNotEmpty({ message: 'El ID del usuario no existe' })
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  brand?: string;

  @Field({ nullable: true })
  @IsOptional()
  model?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y numeros',
  })
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  @IsOptional()
  name?: string;

  //[-.?_"@%&*()+=:\s]
  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'La descripción permite solo algunos caracteres permitidos',
  })
  @Length(3, 550, { message: 'La descripción debe ser mayor a 2 caracteres' })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'Solo números.' })
  @IsOptional()
  price?: number;
}
