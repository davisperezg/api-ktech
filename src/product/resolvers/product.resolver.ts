import { ProductDocument } from './../schemas/product.schema';
import { ProductService } from '../services/product.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { ProductType } from '../dto/querys/product.type';
import { CreateProductInput } from '../dto/inputs/create-product.input';
import { UpdateProductInput } from '../dto/inputs/update-product.input';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductType)
  registerProduct(
    @Args({ name: 'productInput', type: () => CreateProductInput })
    productInput: CreateProductInput,
  ) {
    return this.productService.createProduct(productInput);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args({ name: 'productInput', type: () => UpdateProductInput })
    productInput: UpdateProductInput,
  ) {
    return this.productService.updateProduct(productInput);
  }

  @Query(() => [ProductType])
  getProducts(): Promise<ProductDocument[]> {
    return this.productService.findAllProducts();
  }
}
