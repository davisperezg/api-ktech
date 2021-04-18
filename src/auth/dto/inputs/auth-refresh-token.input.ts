import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthRefreshTokenInput {
  @Field()
  refresh_token: string;

  @Field()
  email: string;
}
