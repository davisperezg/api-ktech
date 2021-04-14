import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserRefreshTokenType {
  @Field()
  access_token: string;
}
