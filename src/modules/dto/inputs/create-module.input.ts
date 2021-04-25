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
