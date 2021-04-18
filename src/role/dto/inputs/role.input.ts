import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';

@InputType()
export class RoleInput {
  @Field()
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del rol solo puede contener letras y números',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;

  // eslint-disable-next-line prettier/prettier
  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'La descripción del rol solo puede contener letras y números',
  })
  @IsOptional()
  @Length(3, 55)
  description?: string;
}
