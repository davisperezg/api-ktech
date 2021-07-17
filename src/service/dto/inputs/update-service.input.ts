import { Field, InputType, ID } from '@nestjs/graphql';

import {
  Length,
  Matches,
  IsOptional,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

@InputType()
export class UpdateServiceInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del usuario no es válido' })
  @IsNotEmpty({ message: 'El ID del usuario no existe' })
  id: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y numeros',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  @Length(3, 55, { message: 'La descripción debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar la descripción del servicio' })
  description?: string;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'Solo números.' })
  @IsNotEmpty({ message: 'Debe completar el precio del servicio' })
  price?: number;
}
