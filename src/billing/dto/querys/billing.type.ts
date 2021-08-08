import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class BillingType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  day: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
