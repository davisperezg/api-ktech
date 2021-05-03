import {
  CreateMenuInput,
  CreateNameMenuDTO,
} from './../../../menu/dto/inputs/create-menu.input';
import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModuleInput {
  @Field()
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del modulo solo puede contener letras y números',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'La descripción del rol solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55)
  description: string;

  // @Field(() => [CreateAccessModuleInput])
  // access: CreateAccessModuleInput[];

  @Field(() => [CreateNameMenuDTO])
  menus: CreateNameMenuDTO[];
}

@InputType()
export class CreateRoleModuleInput {
  @Field()
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del modulo solo puede contener letras y números',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;
}

@InputType()
export class CreateAccessModuleInput {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre del acceso solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;
}
