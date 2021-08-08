import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  //https://support.google.com/a/answer/1371417?hl=es
  @Matches(/(\W|^)(DNI|RUC)(\W|$)/, {
    message: 'El documento solo permite dos opciones. DNI o RUC.',
  })
  @IsNotEmpty({ message: 'Debe completar el documento.' })
  document: string;

  @Field()
  // PARA DNI
  // @Matches(/^\d{8}(?:[-\s]\d{4})?$/, {
  //   message: 'DNI erroneo, formato no válido.',
  // })
  //PARA RUC PERSOA JURIDICA
  // ^((?!(10))[0-9]{11})$
  @IsNotEmpty({ message: 'Debe completar el número documento.' })
  numDocument: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el nombre del cliente.' })
  name: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El apellido debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el apellido del cliente.' })
  lastName: string;

  @Field()
  @MaxLength(9, { message: 'El celular debe contener 9 dígitos.' })
  @MinLength(9, { message: 'El celular debe contener 9 dígitos.' })
  @IsNotEmpty({ message: 'Debe completar el celular.' })
  cellphone_1: string;

  @Field({ nullable: true })
  @MaxLength(9, { message: 'El celular opcional debe contener 9 dígitos.' })
  @MinLength(9, { message: 'El celular opcional debe contener 9 dígitos.' })
  @IsOptional()
  cellphone_2: string;

  @Field({ nullable: true })
  @Length(3, 250, {
    message: 'La dirección debe tener entre 3-250 caracteres.',
  })
  @IsOptional()
  direction: string;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El usuario solo puede contener letras, numeros.',
  })
  @Length(3, 20, { message: 'El usuario debe tener entre 3-20 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el usuario.' })
  username: string;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
    message: 'El usuario solo puede contener letras, numeros.',
  })
  @Length(3, 20, { message: 'La contraseña debe tener entre 3-20 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar la contraseña.' })
  password: string;
}
