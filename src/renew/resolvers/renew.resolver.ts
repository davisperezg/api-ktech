import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { RenewService } from '../services/renew.service';
import { CtxUser } from '../../lib/decorators/ctx-user.decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';
import { RenewType, RenewTypeCheck } from '../dto/querys/renew.type';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RenewDocument } from '../schemas/renew.schema';
import { UpdateRenewInput } from '../dto/inputs/update-renew.input';

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
  @Query(() => [RenewType])
  getVehiculosRenovadosXFecha(
    @Args('desde') desde: Date,
    @Args('hasta') hasta: Date,
  ) {
    return this.renewService.buscarRenovacionesXFecha(desde, hasta);
  }

  @Query(() => RenewType)
  getRenewById(@Args('id') id: string): Promise<RenewDocument> {
    return this.renewService.findAllRenewsById(id);
  }

  @Query(() => [RenewType])
  getRenewByPlate(@Args('id') id: string): Promise<RenewDocument[]> {
    return this.renewService.findAllRenewsByVehicle(id);
  }

  @Mutation(() => RenewTypeCheck)
  toCheck(
    @Args({ name: 'renewInput', type: () => UpdateRenewInput })
    renewInput: UpdateRenewInput,
  ) {
    return this.renewService.toCheck(renewInput);
  }
}
