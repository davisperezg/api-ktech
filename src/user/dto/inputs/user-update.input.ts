import { Field, InputType } from '@nestjs/graphql';

import { Length, IsEmail, Matches, IsOptional } from 'class-validator';

import { IsMatchPassword } from 'src/lib/decorators/match.decorator';
import { UpdateRoleUserInput } from 'src/role/dto/inputs/role-update.input';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @IsOptional()
  @Length(3, 55)
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El apellido solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55)
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener por lo menos una mayúscula y números',
  })
  @IsOptional()
  @Length(6, 55)
  password?: string;

  @Field({ nullable: true })
  @IsMatchPassword('password', {
    message:
      'La confirmación de contraseña no coincide con la contraseña ingresada',
  })
  @IsOptional()
  @Length(6, 55)
  confirmPassword?: string;

  @Field(() => UpdateRoleUserInput, { nullable: true })
  role?: UpdateRoleUserInput;
}
