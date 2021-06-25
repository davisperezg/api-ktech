import { Field, InputType, ID } from '@nestjs/graphql';

import {
  Length,
  IsEmail,
  Matches,
  IsOptional,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

import { IsMatchPassword } from 'src/lib/decorators/match.decorator';
import { UpdateRoleUserInput } from 'src/role/dto/inputs/role-update.input';

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del usuario no es válido' })
  @IsNotEmpty({ message: 'El ID del usuario no existe' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  name?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras',
  })
  @IsOptional()
  @Length(3, 55, { message: 'El apellido debe ser mayor a 2 caracteres' })
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener por lo menos una mayúscula y números',
  })
  @IsOptional()
  @Length(6, 55, { message: 'Contraseña debe ser mayor a 5 caracteres' })
  password?: string;

  @Field({ nullable: true })
  @IsMatchPassword('password', {
    message:
      'La confirmación de contraseña no coincide con la contraseña ingresada',
  })
  @IsOptional()
  @Length(6, 55, {
    message: 'Repetir contraseña debe ser mayor a 5 caracteres',
  })
  confirmPassword?: string;

  @Field(() => UpdateRoleUserInput, { nullable: true })
  role?: UpdateRoleUserInput;
}
