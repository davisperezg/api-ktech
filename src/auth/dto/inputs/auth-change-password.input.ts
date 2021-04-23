import { Field, InputType, ID } from '@nestjs/graphql';

import { IsMatchPassword } from 'src/lib/decorators/match.decorator';

import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class AuthChangePasswordInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener por lo menos una mayúscula y números',
  })
  @IsNotEmpty()
  @Length(6, 55)
  currentPassword: string;

  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener por lo menos una mayúscula y números',
  })
  @IsNotEmpty()
  @Length(6, 55)
  newPassword: string;

  @Field()
  @IsMatchPassword('newPassword', {
    message:
      'La confirmación de contraseña no coincide con la nueva contraseña ingresada',
  })
  @IsNotEmpty()
  @Length(6, 55)
  confirmNewPassword: string;
}
