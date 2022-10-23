import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, IsMongoId, IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class UpdateVehicleInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID del vehiculo no es válido' })
  @IsNotEmpty({ message: 'El ID del vehiculo no existe' })
  id: string;

  @Field()
  @IsOptional()
  customer: string;

  @Field()
  @IsOptional()
  device: string;

  @Field({ nullable: true })
  @IsOptional()
  platform: string;

  @Field()
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'La placa solo permite letras y numeros, los - se no aceptan',
  })
  @IsOptional()
  plate: string;

  @Field({ nullable: true })
  @IsOptional()
  sim: string;

  @Field()
  @IsOptional()
  nroGPS: string;

  @Field()
  retired: boolean;
  // @Field()
  // @IsOptional()
  // billigStart: string;
}
