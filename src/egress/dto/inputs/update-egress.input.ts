import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  Length,
  IsNumberString,
  Matches,
  IsMongoId,
} from 'class-validator';

@InputType()
export class UpdateEgressInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del egreso no es válido' })
  @IsNotEmpty({ message: 'El ID del egreso no existe' })
  id: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'La categoria solo puede contener letras',
  })
  @IsNotEmpty({ message: 'Debe completar la categoria' })
  category?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el detalle del egreso' })
  detail?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9,.áéíóúÑñ\s]+$/, {
    message:
      'La observación solo puede contener letras y numeros y algunas caracteristicas.',
  })
  @Length(3, 500, {
    message: 'La observación debe tener entre 3-500 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe completar la observación del egreso' })
  observation?: string;

  @Field({ nullable: true })
  @IsNumberString({}, { message: 'La unidad solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar la unidad o unidades del egreso' })
  units?: string;

  @Field({ nullable: true })
  @IsNumberString({}, { message: 'El monto solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar el monto del egreso' })
  amount?: string;
}
