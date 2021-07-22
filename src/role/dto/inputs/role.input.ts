import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';
import { CreateRoleModuleInput } from 'src/modules/dto/inputs/create-module.input';

@InputType()
export class RoleInput {
  @Field()
  @Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
    message: 'El nombre del rol solo puede contener letras y números',
  })
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar el nombre' })
  name: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ,.0-9\s]+$/, {
    message:
      'La descripción solo puede contener letras, números y algunos caracteres permitidos.',
  })
  @Length(3, 150, {
    message: 'La descripción debe tener entre 3-150 caracteres.',
  })
  @IsOptional()
  description?: string;

  @Field(() => [CreateRoleModuleInput])
  modules: CreateRoleModuleInput[];
}

@InputType()
export class CreateRoleUserInput {
  @Field()
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del rol solo puede contener letras y números',
  })
  @Length(3, 55)
  @IsNotEmpty()
  name: string;
}
