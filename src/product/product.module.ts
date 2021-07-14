import { Module } from '@nestjs/common';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';

@Module({
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
