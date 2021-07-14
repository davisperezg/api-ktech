import { CategoryType } from '../dto/querys/category.type';
import { CategoryService } from '../services/category.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput } from '../dto/inputs/create-category.input';
import { UpdateCategoryInput } from '../dto/inputs/update-category.input';
import { CategoryDocument } from '../schemas/category.schema';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryType)
  registerCategory(
    @Args({ name: 'categoryInput', type: () => CreateCategoryInput })
    categoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.createCategory(categoryInput);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @Args({ name: 'categoryInput', type: () => UpdateCategoryInput })
    categoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.updateCategory(categoryInput);
  }

  @Query(() => [CategoryType])
  getCategorys(): Promise<CategoryDocument[]> {
    return this.categoryService.findAllCategory();
  }
}
