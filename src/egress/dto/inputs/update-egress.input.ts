import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  Length,
  IsNumberString,
  Matches,
  IsMongoId,
  IsOptional,
  IsNumber,
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
  @IsOptional()
  category?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
  detail?: string;

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

  @Field({ nullable: true })
  @IsNumber({}, { message: 'La unidad solo permite números.' })
  @IsOptional()
  units?: number;

  @Field({ nullable: true })
  @IsNumber({}, { message: 'El monto solo permite números.' })
  @IsOptional()
  amount?: number;

  @Field({ nullable: true })
  user: string;
}
