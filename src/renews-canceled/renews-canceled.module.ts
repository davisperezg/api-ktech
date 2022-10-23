import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RenewSchema } from 'src/renew/schemas/renew.schema';
import { CanceledSchema } from './schemas/canceled.schema';
import { CanceledService } from './services/canceled.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Canceled', schema: CanceledSchema },
      { name: 'Renew', schema: RenewSchema },
    ]),
  ],
  providers: [CanceledService],
})
export class RenewsCanceledModule {}
