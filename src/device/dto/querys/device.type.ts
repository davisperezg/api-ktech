import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class DeviceType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
