import { Field, InputType } from '@nestjs/graphql';

import { Length, IsOptional, Matches } from 'class-validator';

@InputType()
export class RoleUpdateInput {
  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del rol solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55)
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'La descripción del rol solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55)
  description?: string;
}
