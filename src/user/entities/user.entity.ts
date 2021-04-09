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
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
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
