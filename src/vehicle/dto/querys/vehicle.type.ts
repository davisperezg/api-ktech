import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BillingType } from 'src/billing/dto/querys/billing.type';
import { CustomerType } from 'src/customer/dto/querys/customer.type';
import { DeviceType } from 'src/device/dto/querys/device.type';
import { UserType } from 'src/user/dto/querys/user.type';

@ObjectType()
export class VehicleType {
  @Field(() => ID)
  id: string;

  @Field(() => CustomerType, { nullable: true })
  customer: CustomerType;

  @Field(() => DeviceType, { nullable: true })
  device: DeviceType;

  @Field(() => BillingType, { nullable: true })
  billing: BillingType;

  @Field(() => UserType, { nullable: true })
  createdBy: UserType;

  @Field(() => UserType, { nullable: true })
  updatedBy: UserType;

  @Field({ nullable: true })
  platform: string;

  @Field()
  plate: string;

  @Field({ nullable: true })
  sim: string;

  @Field()
  nroGPS: string;

  @Field(() => Date, { nullable: true })
  billigStart: Date;

  @Field(() => Date, { nullable: true })
  billigEnd: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
