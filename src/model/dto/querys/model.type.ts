import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BrandType } from 'src/brand/dto/querys/brand.type';

@ObjectType()
export class ModelType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => BrandType, { nullable: true })
  brand: BrandType;
}
