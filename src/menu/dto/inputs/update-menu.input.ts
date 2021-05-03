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
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El menu solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55)
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El link del menu solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55)
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
