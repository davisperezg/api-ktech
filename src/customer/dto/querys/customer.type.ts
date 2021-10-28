import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CustomerType {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  document: string;

  @Field({ nullable: true })
  numDocument: string;

  @Field({ nullable: true })
  cellphone_1: string;

  @Field({ nullable: true })
  cellphone_2: string;

  @Field({ nullable: true })
  direction: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  fecha_nac: Date;
}
