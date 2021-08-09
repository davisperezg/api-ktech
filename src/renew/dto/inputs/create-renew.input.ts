import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRenewInput {
  @Field()
  @IsNotEmpty({ message: 'Debe seleccionar el vehiculo.' })
  vehicle: string;

  @Field()
  @IsNotEmpty({ message: 'Debe seleccionar el  plan de facturación.' })
  billing: string;
}
