import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserTokenType {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
