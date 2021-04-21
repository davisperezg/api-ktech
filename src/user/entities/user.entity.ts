import { RoleEntity } from 'src/role/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: string;

  @ObjectIdColumn()
  role: ObjectID;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  //more info -> https://typeorm.io/#/listeners-and-subscribers
  @BeforeInsert()
  beforeInsertAction() {
    this.email = this.email.toLocaleLowerCase();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
