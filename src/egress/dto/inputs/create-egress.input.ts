import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  Length,
  IsNumberString,
  Matches,
  IsOptional,
  IsNumber,
} from 'class-validator';

@InputType()
export class CreateEgressInput {
  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'La categoria solo puede contener letras',
  })
  @IsNotEmpty({ message: 'Debe completar la categoria' })
  category: string;

  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el detalle del egreso' })
  detail: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z0-9,.áéíóúÑñ\s]+$/, {
    message:
      'La observación solo puede contener letras, numeros y algunos caracteres permitidos.',
  })
  @Length(3, 500, {
    message: 'La observación debe tener entre 3-500 caracteres.',
  })
  @IsOptional()
  observation?: string;

  @Field()
  @IsNumber({}, { message: 'La unidad solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar la unidad o unidades del egreso' })
  units: number;

  @Field()
  @IsNumber({}, { message: 'El monto solo permite números.' })
  @IsNotEmpty({ message: 'Debe completar el monto del egreso' })
  amount: number;

  @Field()
  user: string;
}
