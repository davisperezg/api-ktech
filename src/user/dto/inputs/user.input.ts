import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, Length, IsEmail, Matches } from 'class-validator';
import { IsMatchPassword } from 'src/lib/decorators/match.decorator';
import { CreateRoleUserInput } from 'src/role/dto/inputs/role.input';

@InputType()
export class UserInput {
  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras',
  })
  @Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar el nombre' })
  name: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras',
  })
  @Length(3, 55, { message: 'El apellido debe ser mayor a 2 caracteres' })
  @IsNotEmpty({ message: 'Debe completar el apellido' })
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completar el rol' })
  role: CreateRoleUserInput;

  @Field()
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsNotEmpty({ message: 'Debe completar el correo' })
  email: string;

  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener por lo menos una mayúscula y números',
  })
  @Length(6, 55, { message: 'Contraseña debe ser mayor a 5 caracteres' })
  @IsNotEmpty({ message: 'Debe completar la contraseña' })
  password: string;

  @Field()
  @IsMatchPassword('password', {
    message:
      'La confirmación de contraseña no coincide con la contraseña ingresada',
  })
  @Length(6, 55, {
    message: 'Repetir contraseña debe ser mayor a 5 caracteres',
  })
  @IsNotEmpty({ message: 'Debe completar la confirmación de contraseña' })
  confirmPassword: string;
}
