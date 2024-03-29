import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre puede contener letras, numeros, guiones y espacios.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el nombre del plan de facturación.' })
  name: string;

  @Field({ nullable: true })
  commands: string;

  @Field({ nullable: true })
  commandsclient: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre puede contener letras, numeros, guiones y espacios.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  reference: string;
}
