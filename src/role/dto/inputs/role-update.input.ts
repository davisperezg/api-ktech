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
  @IsMongoId()
  @IsNotEmpty()
  id: string;

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
