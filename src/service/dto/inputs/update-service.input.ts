import { Field, InputType, ID } from '@nestjs/graphql';

import {
  Length,
  Matches,
  IsOptional,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
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
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @Length(3, 500, {
    message: 'La descripción debe tener entre 3-500 caracteres.',
  })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsNumberString({}, { message: 'El precio solo permite números.' })
  @IsOptional()
  price?: string;
}
