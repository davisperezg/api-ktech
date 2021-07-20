import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { CreateModelInput } from '../dto/inputs/create-model.input';
import { ModelService } from '../services/model.service';
import { UpdateModelInput } from '../dto/inputs/update-model.input';
import { ModelType } from '../dto/querys/model.type';
import { ModelDocument } from '../schemas/model.schema';

@Resolver()
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Mutation(() => ModelType)
  registerModel(
    @Args({ name: 'modelInput', type: () => CreateModelInput })
    modelInput: CreateModelInput,
  ) {
    return this.modelService.createModel(modelInput);
  }

  @Mutation(() => ModelType)
  updateModel(
    @Args({ name: 'modelInput', type: () => UpdateModelInput })
    modelInput: UpdateModelInput,
  ) {
    return this.modelService.updateModel(modelInput);
  }

  @Query(() => [ModelType])
  getModels(): Promise<ModelDocument[]> {
    return this.modelService.findAllModels();
  }

  @Query(() => [ModelType])
  getModelsByBrand(@Args('brand') brand: string): Promise<ModelDocument[]> {
    return this.modelService.findModelsByBrand(brand);
  }
}
