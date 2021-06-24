import { MenuType } from './../../../menu/dto/querys/menu.type';
import { AccessType } from './../../../access/dto/querys/access.type';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ModuleType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [AccessType])
  access: AccessType[];

  @Field(() => [MenuType])
  menus: MenuType[];
}
