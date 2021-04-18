import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('Role')
export class RoleEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  //more info -> https://typeorm.io/#/listeners-and-subscribers
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
