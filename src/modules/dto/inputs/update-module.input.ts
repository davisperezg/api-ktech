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
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'El nombre del modulo solo puede contener letras y números',
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

  // @Field(() => [UpdateAccessModuleInput], { nullable: true })
  // access?: UpdateAccessModuleInput[];

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
