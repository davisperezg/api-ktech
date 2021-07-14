import { Module } from '@nestjs/common';
import { ModelResolver } from './resolvers/model.resolver';
import { ModelService } from './services/model.service';

@Module({
  providers: [ModelResolver, ModelService]
})
export class ModelModule {}
