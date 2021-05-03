import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre del menu solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;

  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El link del menu solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  link: string;
}

@InputType()
export class CreateNameMenuDTO {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre del menu solo puede contener letras',
  })
  @IsNotEmpty()
  @Length(3, 55)
  name: string;
}
