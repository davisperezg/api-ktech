import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsNotEmpty({ message: 'Debe completer el cliente.' })
  customer: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completer el dispositivo.' })
  device: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completer el plan de facturación.' })
  billing: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completer el tipo de plataforma.' })
  platform: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completar la placa del vehiculo' })
  plate: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completer el tipo de sim.' })
  sim: string;

  @Field()
  @IsNotEmpty({ message: 'Debe completar el número de gps' })
  nroGPS: string;

  /**
  *  @Field()
  @IsNotEmpty({ message: 'Debe completar la fecha de inicio' })
  billigStart: string;
  */
}
