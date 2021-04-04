import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  readonly name: string;
}
