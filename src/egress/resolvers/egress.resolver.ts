import { EgressDocument } from '../schemas/egress.schema';
import { EgressService } from '../services/egress.service';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { EgressType } from '../dto/querys/egress.type';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class EgressResolver {
  constructor(private readonly egressService: EgressService) {}

  @Mutation(() => EgressType)
  registerEgress(
    @Args({ name: 'egressInput', type: () => CreateEgressInput })
    egressInput: CreateEgressInput,
  ) {
    return this.egressService.createEgress(egressInput);
  }

  @Mutation(() => EgressType)
  updateEgress(
    @Args({ name: 'egressInput', type: () => UpdateEgressInput })
    egressInput: UpdateEgressInput,
  ) {
    return this.egressService.updateEgress(egressInput);
  }

  @Mutation(() => Boolean)
  deleteEgress(@Args('id') id: string) {
    return this.egressService.deleteEgressById(id);
  }

  @Query(() => [EgressType])
  getEgress(): Promise<EgressDocument[]> {
    return this.egressService.findAllEgressToDay();
  }

  @Query(() => [EgressType])
  getEgressByDates(
    @Args('start') start: string,
    @Args('end') end: string,
  ): Promise<EgressDocument[]> {
    return this.egressService.findEgressByDates(start, end);
  }
}
