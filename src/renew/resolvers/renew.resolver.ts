import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { RenewService } from '../services/renew.service';
import { CtxUser } from '../../lib/decorators/ctx-user.decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RenewType } from '../dto/querys/renew.type';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RenewDocument } from '../schemas/renew.schema';

@Resolver()
@UseGuards(GqlAuthGuard)
export class RenewResolver {
  constructor(private readonly renewService: RenewService) {}

  @Mutation(() => RenewType)
  registerRenew(
    @Args({ name: 'renewInput', type: () => CreateRenewInput })
    renewInput: CreateRenewInput,
    @CtxUser() user: UserDocument,
  ) {
    return this.renewService.createRenew(renewInput, user.id);
  }

  @Query(() => [RenewType])
  getRenews(): Promise<RenewDocument[]> {
    return this.renewService.findAllRenews();
  }
}
