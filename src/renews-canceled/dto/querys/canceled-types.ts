import { Field, InputType, ID } from '@nestjs/graphql';

import { IsOptional } from 'class-validator';
import { RenewType } from 'src/renew/dto/querys/renew.type';

@InputType()
export class CanceledType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  message?: string;

  @Field(() => RenewType, { nullable: true })
  @IsOptional()
  renew: RenewType;
}
