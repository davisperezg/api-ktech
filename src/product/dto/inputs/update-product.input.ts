import { Field, InputType, ID } from '@nestjs/graphql';

import {
  IsNumberString,
  IsOptional,
  Length,
  Matches,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
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
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
  name?: string;

  //[-.?_"@%&*()+=:\s]
  @Field({ nullable: true })
  @Matches(/^[^$%&|<>#]*$/, {
    message: 'La descripción permite solo algunos caracteres permitidos',
  })
  @Length(3, 500, {
    message: 'La descripción debe tener entre 3-500 caracteres.',
  })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'El precio solo permite números.' })
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'La cantidad solo permite números.' })
  @IsOptional()
  cant?: number;
}
