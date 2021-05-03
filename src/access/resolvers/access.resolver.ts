import { AccessType } from './../dto/querys/access.type';
import { Query, Resolver } from '@nestjs/graphql';
import { AccessService } from '../services/access.service';

@Resolver()
export class AccessResolver {
  constructor(private readonly accessService: AccessService) {}

  @Query(() => [AccessType])
  getAccess() {
    return this.accessService.findAllAccess();
  }
}
