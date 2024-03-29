import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsOptional,
  Length,
  Matches,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateDeviceInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del cliente no es válido' })
  @IsNotEmpty({ message: 'El ID del cliente no existe' })
  id: string;

  @Field()
  @Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
    message: 'El nombre puede contener letras, numeros, guiones y espacios.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
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
