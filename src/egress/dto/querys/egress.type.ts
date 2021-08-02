import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { CategoryType } from 'src/category/dto/querys/category.type';
import { UserType } from 'src/user/dto/querys/user.type';

@ObjectType()
export class EgressType {
  @Field(() => ID)
  id: string;

  @Field()
  detail: string;

  @Field({ nullable: true })
  observation: string;

  @Field(() => Int)
  units: number;

  @Field(() => CategoryType, { nullable: true })
  category: CategoryType;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  total: number;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => UserType, { nullable: true })
  user: UserType;
}
