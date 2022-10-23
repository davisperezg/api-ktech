import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { UpdateCanceledInput } from '../dto/inputs/update-canceled.input';
import { CreateCanceledInput } from '../dto/inputs/create-canceled.input';
import { CanceledType } from '../dto/querys/canceled-types';
import { CanceledDocument } from '../schemas/canceled.schema';
import { CanceledService } from '../services/canceled.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CanceledResolver {
  constructor(private readonly canceledService: CanceledService) {}

  @Mutation(() => CanceledType)
  registerCanceled(
    @Args({ name: 'canceledInput', type: () => CreateCanceledInput })
    canceledInput: CreateCanceledInput,
  ) {
    return this.canceledService.createCanceled(canceledInput);
  }

  @Mutation(() => CanceledType)
  updateCanceled(
    @Args({ name: 'canceledInput', type: () => UpdateCanceledInput })
    canceledInput: UpdateCanceledInput,
  ) {
    return this.canceledService.updateCanceled(canceledInput);
  }

  @Query(() => CanceledType)
  getCanceled(@Args('id') id: string): Promise<CanceledDocument> {
    return this.canceledService.findOneCanceledById(id);
  }
}
