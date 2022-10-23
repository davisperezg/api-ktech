import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class DeviceType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  commands: string;

  @Field({ nullable: true })
  commandsclient: string;

  @Field({ nullable: true })
  reference: string;
}
