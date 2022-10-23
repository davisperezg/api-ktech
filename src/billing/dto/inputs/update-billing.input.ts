import { Field, InputType, ID, Int, Float } from '@nestjs/graphql';
import {
  IsOptional,
  Length,
  Matches,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateBillingInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del plan de facturación no es válido' })
  @IsNotEmpty({ message: 'El ID del plan de facturación no existe' })
  id: string;

  @Field(() => String, { nullable: true })
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsOptional()
  name: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  day: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  price: number;
}
