import { CategoryType } from './../../../category/dto/querys/category.type';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ServiceType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => CategoryType, { nullable: true })
  category: CategoryType;
}
