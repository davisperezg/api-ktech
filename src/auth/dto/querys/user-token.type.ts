import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/user/dto/querys/user.type';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class UserTokenType {
  @Field()
  token: string;
}
