import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CustomerType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  document: string;

  @Field()
  numDocument: string;

  @Field()
  cellphone_1: string;

  @Field({ nullable: true })
  cellphone_2: string;

  @Field({ nullable: true })
  direction: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
