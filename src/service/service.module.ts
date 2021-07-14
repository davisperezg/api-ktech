import { Module } from '@nestjs/common';
import { ServiceResolver } from './resolvers/service.resolver';
import { ServiceService } from './services/service.service';

@Module({
  providers: [ServiceResolver, ServiceService]
})
export class ServiceModule {}
