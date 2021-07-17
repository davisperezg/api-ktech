import { Module } from '@nestjs/common';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { CategoryService } from 'src/category/services/category.service';
import { ServiceResolver } from './resolvers/service.resolver';
import { ServiceSchema } from './schemas/service.schema';
import { ServiceService } from './services/service.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Service', schema: ServiceSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [ServiceResolver, ServiceService, CategoryService],
})
export class ServiceModule {}
