import { AccessType } from './../dto/querys/access.type';
import { Query, Resolver } from '@nestjs/graphql';
import { AccessService } from '../services/access.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AccessResolver {
  constructor(private readonly accessService: AccessService) {}

  @Query(() => [AccessType])
  getAccess() {
    return this.accessService.findAllAccess();
  }
}
