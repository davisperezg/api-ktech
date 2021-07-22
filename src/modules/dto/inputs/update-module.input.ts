import { UpdateNameMenuDTO } from './../../../menu/dto/inputs/update-menu.input';
import {
  Length,
  IsOptional,
  Matches,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';

import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateModuleInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' })
  @IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
    message: 'El nombre del modulo solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ,0-9\s]+$/, {
    message: 'La descripción solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 150, {
    message: 'La descripción debe tener entre 3-150 caracteres.',
  })
  description?: string;

  @Field(() => [UpdateAccessModuleInput], { nullable: true })
  access?: UpdateAccessModuleInput[];

  @Field(() => [UpdateNameMenuDTO], { nullable: true })
  menus: UpdateNameMenuDTO[];
}

@InputType()
export class UpdateAccessModuleInput {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre del acceso solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name?: string;
}
