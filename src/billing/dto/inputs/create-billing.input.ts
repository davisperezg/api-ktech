import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateBillingInput {
  @Field()
  @Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras.',
  })
  @Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' })
  @IsNotEmpty({ message: 'Debe completar el nombre del plan de facturación.' })
  name: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Debe completar los dias del plan de facturación.' })
  day: number;

  @Field(() => Float)
  @IsNotEmpty({ message: 'Debe completar el precio del plan de facturación.' })
  price: number;
}
