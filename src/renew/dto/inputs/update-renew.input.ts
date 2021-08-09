import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateRenewInput {
  @Field(() => ID)
  @IsMongoId({ message: 'El ID de la renovacion no es válido' })
  @IsNotEmpty({ message: 'El ID de la renovacion no existe' })
  id: string;

  @Field()
  @IsOptional()
  vehicle: string;

  @Field()
  @IsOptional()
  billing: string;
}
