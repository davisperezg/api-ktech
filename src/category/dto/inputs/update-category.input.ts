import {
  Matches,
  IsNotEmpty,
  Length,
  IsOptional,
  IsMongoId,
} from 'class-validator';

import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' })
  @IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'La categoria solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;
}
