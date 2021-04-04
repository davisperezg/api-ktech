import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field(() => Date)
  @Column()
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @BeforeInsert()
  beforeInsertAction() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
