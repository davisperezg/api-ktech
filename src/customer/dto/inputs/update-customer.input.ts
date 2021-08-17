import { Field, InputType, ID } from '@nestjs/graphql';
import {
  Length,
  Matches,
  IsOptional,
  MinLength,
  MaxLength,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateCustomerInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del cliente no es válido' })
  @IsNotEmpty({ message: 'El ID del cliente no existe' })
  id: string;

  @Field()
  //https://support.google.com/a/answer/1371417?hl=es
  @Matches(/(\W|^)(DNI|RUC)(\W|$)/, {
    message: 'El documento solo permite dos opciones. DNI o RUC.',
  })
  @IsOptional()
  document?: string;

  @Field()
  // PARA DNI
  // @Matches(/^\d{8}(?:[-\s]\d{4})?$/, {
  //   message: 'DNI erroneo, formato no válido.',
  // })
  //PARA RUC PERSOA JURIDICA
  // ^((?!(10))[0-9]{11})$
  @IsOptional()
  numDocument?: string;

  @Field()
  @Matches(/^[A-Za-záéíóú.Ññ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
  name?: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El apellido debe tener entre 3-55 caracteres.' })
  @IsOptional()
  lastName?: string;

  @Field()
  @MaxLength(9, { message: 'El celular debe contener 9 dígitos.' })
  @MinLength(9, { message: 'El celular debe contener 9 dígitos.' })
  @IsOptional()
  cellphone_1?: string;

  @Field({ nullable: true })
  @MaxLength(9, { message: 'El celular opcional debe contener 9 dígitos.' })
  @MinLength(9, { message: 'El celular opcional debe contener 9 dígitos.' })
  @IsOptional()
  cellphone_2?: string;

  @Field({ nullable: true })
  @Length(3, 250, {
    message: 'La dirección debe tener entre 3-250 caracteres.',
  })
  @IsOptional()
  direction?: string;

  @Field()
  @Matches(/^[A-Za-z0-9_áéíóúÑñ\s]+$/, {
    message: 'El usuario solo puede contener letras, numeros.',
  })
  @Length(3, 20, { message: 'El usuario debe tener entre 3-20 caracteres.' })
  @IsOptional()
  username?: string;

  @Field()
  @Matches(/^[A-Za-z0-9_áéíóúÑñ\s]+$/, {
    message: 'El usuario solo puede contener letras, numeros.',
  })
  @Length(3, 20, { message: 'La contraseña debe tener entre 3-20 caracteres.' })
  @IsOptional()
  password?: string;
}
