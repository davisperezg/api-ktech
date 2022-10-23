import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class UpdateCanceledInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del usuario no es válido' })
  @IsNotEmpty({ message: 'El ID del usuario no existe' })
  id: string;

  @Field()
  status: number;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre puede contener letras, numeros, guiones y espacios.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el mensaje.' })
  message: string;

  @Field()
  @IsNotEmpty({ message: 'Debe ingresar la renovacion.' })
  renew: string;
}
