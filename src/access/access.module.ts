import { AccessSchema } from './schemas/access.schema';
import { Module } from '@nestjs/common';
import { AccessResolver } from './resolvers/access.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessService } from './services/access.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Access', schema: AccessSchema }]),
  ],
  providers: [AccessResolver, AccessService],
})
export class AccessModule {}
