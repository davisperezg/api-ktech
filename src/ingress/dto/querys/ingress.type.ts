import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import { CategoryType } from 'src/category/dto/querys/category.type';
import { UserType } from 'src/user/dto/querys/user.type';

@ObjectType()
export class IngressType {
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

  @Field(() => Float)
  amount: number;

  @Field(() => Float)
  total: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserType, { nullable: true })
  user: UserType;
}
