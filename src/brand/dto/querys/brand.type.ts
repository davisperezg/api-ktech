import { CategoryType } from './../../../category/dto/querys/category.type';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class BrandType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => CategoryType, { nullable: true })
  category: CategoryType;
}
