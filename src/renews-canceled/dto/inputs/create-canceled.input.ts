import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateCanceledInput {
  @Field()
  @IsNotEmpty({ message: 'Debe ingresar la renovacion.' })
  renew: string;
}
