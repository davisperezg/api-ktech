import {
  Matches,
  IsNotEmpty,
  Length,
  IsOptional,
  IsMongoId,
} from 'class-validator';

import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMenuInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' })
  @IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El menu solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El link del menu solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El link debe ser mayor a 2 caracteres' })
  link?: string;
}

@InputType()
export class UpdateNameMenuDTO {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre del menu solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;
}
