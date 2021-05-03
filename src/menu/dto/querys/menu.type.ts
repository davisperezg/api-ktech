import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class MenuType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  link: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
