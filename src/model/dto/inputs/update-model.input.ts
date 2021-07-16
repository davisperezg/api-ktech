import { Field, InputType, ID } from '@nestjs/graphql';

import {
  Length,
  Matches,
  IsOptional,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateModelInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del usuario no es válido' })
  @IsNotEmpty({ message: 'El ID del usuario no existe' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  brand?: string;
}
