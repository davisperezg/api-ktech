import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { BillingType } from 'src/billing/dto/querys/billing.type';
import { UserType } from 'src/user/dto/querys/user.type';
import { VehicleType } from 'src/vehicle/dto/querys/vehicle.type';

@ObjectType()
export class RenewType {
  @Field(() => ID)
  id: string;

  @Field(() => VehicleType, { nullable: true })
  vehicle: VehicleType;

  @Field(() => BillingType, { nullable: true })
  billing: BillingType;

  @Field(() => UserType, { nullable: true })
  registeredBy: UserType;

  @Field(() => UserType, { nullable: true })
  updatedBy: UserType;

  @Field(() => Date)
  expirationDate: Date;

  @Field(() => Date)
  renovationStart: Date;

  @Field(() => Date)
  renovationEnd: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  billingPayToday: String;

  @Field(() => String, { nullable: true })
  billingDes: String;

  @Field(() => Int, { nullable: true })
  status: number;
}

@ObjectType()
export class RenewTypeCheck {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  status: number;
}
