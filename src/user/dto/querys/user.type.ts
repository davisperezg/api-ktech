import { Field, ObjectType, ID } from '@nestjs/graphql';
import { RoleType } from 'src/role/dto/querys/role.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => RoleType, { nullable: true })
  role: RoleType;

  @Field(() => Number, { nullable: true })
  status: number;
}
