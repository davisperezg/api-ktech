import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';

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

  @Field()
  @IsOptional()
  billing: string;

  @Field({ nullable: true })
  @IsOptional()
  platform: string;

  @Field()
  @IsOptional()
  plate: string;

  @Field({ nullable: true })
  @IsOptional()
  sim: string;

  @Field()
  @IsOptional()
  nroGPS: string;

  // @Field()
  // @IsOptional()
  // billigStart: string;
}
