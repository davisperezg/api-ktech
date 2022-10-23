import { Module } from '@nestjs/common';
import { SextController } from './controllers/sext.controller';
import { SExtService } from './services/sext.service';

@Module({
  providers: [SExtService],
  controllers: [SextController],
})
export class SExtModule {}
