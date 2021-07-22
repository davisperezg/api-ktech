import { Field, InputType, ID } from '@nestjs/graphql';

import {
  Length,
  IsOptional,
  Matches,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class RoleUpdateInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' })
  @IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
    message: 'El nombre solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ,.0-9\s]+$/, {
    message:
      'La descripción solo puede contener letras, números y algunos caracteres permitidos.',
  })
  @IsOptional()
  @Length(3, 150, {
    message: 'La descripción debe tener entre 3-150 caracteres.',
  })
  description?: string;

  @Field(() => [UpdateRoleUserInput], { nullable: true })
  modules?: UpdateRoleUserInput[];
}

@InputType()
export class UpdateRoleUserInput {
  @Field()
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del rol solo puede contener letras y números',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name?: string;
}
