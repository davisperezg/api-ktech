import { Module } from '@nestjs/common';
import { CustomerResolver } from './resolvers/customer.resolver';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './services/customer.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  providers: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
