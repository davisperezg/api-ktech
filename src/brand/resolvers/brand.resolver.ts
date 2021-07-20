import { UpdateBrandInput } from './../dto/inputs/update-brand.input';
import { CreateBrandInput } from './../dto/inputs/create-brand.input';
import { BrandType } from '../dto/querys/brand.type';
import { BrandService } from '../services/brand.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { BrandDocument } from '../schemas/brand.schema';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Mutation(() => BrandType)
  registerBrand(
    @Args({ name: 'brandInput', type: () => CreateBrandInput })
    brandInput: CreateBrandInput,
  ) {
    return this.brandService.createBrand(brandInput);
  }

  @Mutation(() => BrandType)
  updateBrand(
    @Args({ name: 'brandInput', type: () => UpdateBrandInput })
    brandInput: UpdateBrandInput,
  ) {
    return this.brandService.updateBrand(brandInput);
  }

  @Query(() => [BrandType])
  getBrands(): Promise<BrandDocument[]> {
    return this.brandService.findAllBrands();
  }

  @Query(() => [BrandType])
  getBrandsByCategory(
    @Args('category') category: string,
  ): Promise<BrandDocument[]> {
    return this.brandService.findBrandsByCategory(category);
  }
}
