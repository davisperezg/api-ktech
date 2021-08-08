import { Module } from '@nestjs/common';
import { DeviceResolver } from './resolvers/device.resolver';
import { DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  providers: [DeviceResolver, DeviceService],
})
export class DeviceModule {}
