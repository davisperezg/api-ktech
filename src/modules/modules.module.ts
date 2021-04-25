import { Module } from '@nestjs/common';
import { ModuleService } from './services/module.service';
import { ModuleResolver } from './resolvers/module.resolver';
import { ModuleSchema } from './schemas/module.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]),
  ],
  providers: [ModuleService, ModuleResolver],
})
export class ModulesModule {}
