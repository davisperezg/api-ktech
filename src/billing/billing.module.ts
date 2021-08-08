import { Module } from '@nestjs/common';
import { BillingResolver } from './resolvers/billing.resolver';
import { BillingService } from './services/billing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingSchema } from './schemas/billing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Billing', schema: BillingSchema }]),
  ],
  providers: [BillingResolver, BillingService],
})
export class BillingModule {}
