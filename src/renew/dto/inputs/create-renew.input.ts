import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class PropsTime {
  @Field()
  name: string;
}

@InputType()
export class Time {
  @Field(() => String)
  year: string;

  @Field(() => [String])
  months: string[];
}

@InputType()
export class CreateRenewInput {
  @Field()
  @IsNotEmpty({ message: 'Debe seleccionar el vehiculo.' })
  vehicle: string;

  @Field()
  @IsNotEmpty({ message: 'Debe seleccionar el  plan de facturación.' })
  billing: string;

  @Field()
  @IsNotEmpty({ message: 'Debe ingresar alguna descripción de la renovación.' })
  billingDes: string;

  @Field()
  @IsString()
  billingPayToday: string;

  @Field(() => [Time])
  @IsOptional()
  billingTime: Time[];
}
