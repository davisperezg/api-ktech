import { CategoryType } from './../../../category/dto/querys/category.type';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { ModelType } from 'src/model/dto/querys/model.type';
import { BrandType } from 'src/brand/dto/querys/brand.type';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => CategoryType, { nullable: true })
  category: CategoryType;

  @Field(() => CategoryType, { nullable: true })
  brand: BrandType;

  @Field(() => CategoryType, { nullable: true })
  model: ModelType;
}
