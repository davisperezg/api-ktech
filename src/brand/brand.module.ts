import { Module } from '@nestjs/common';
import { BrandResolver } from './resolvers/brand.resolver';
import { BrandService } from './services/brand.service';

@Module({
  providers: [BrandResolver, BrandService],
})
export class BrandModule {}
