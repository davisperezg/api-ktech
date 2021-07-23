import { IngressService } from '../services/ingress.service';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { IngressType } from '../dto/querys/ingress.type';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
import { IngressDocument } from '../schemas/ingress.schema';

@Resolver()
@UseGuards(GqlAuthGuard)
export class IngressResolver {
  constructor(private readonly ingressService: IngressService) {}

  @Mutation(() => IngressType)
  registerIngress(
    @Args({ name: 'ingressInput', type: () => CreateIngressInput })
    ingressInput: CreateIngressInput,
  ) {
    return this.ingressService.createIngress(ingressInput);
  }

  @Mutation(() => IngressType)
  updateIngress(
    @Args({ name: 'ingressInput', type: () => UpdateIngressInput })
    ingressInput: UpdateIngressInput,
  ) {
    return this.ingressService.updateIngress(ingressInput);
  }

  @Mutation(() => Boolean)
  deleteIngress(@Args('id') id: string) {
    return this.ingressService.deleteIngressById(id);
  }

  @Query(() => [IngressType])
  getIngress(): Promise<IngressDocument[]> {
    return this.ingressService.findAllIngress();
  }
}
