import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateDeviceInput } from '../dto/inputs/create-device.input';
import { UpdateDeviceInput } from '../dto/inputs/update-device.input';
import { DeviceDocument } from '../schemas/device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel('Device')
    private readonly deviceModel: Model<DeviceDocument>,
  ) {}

  async createDevice(deviceInput: CreateDeviceInput): Promise<DeviceDocument> {
    const { name } = deviceInput;

    await this.findOneDeviceByName(name, EXIST);

    const newDevice = new this.deviceModel({ ...deviceInput, status: 1 });

    let saveCategory: DeviceDocument;

    try {
      saveCategory = await newDevice.save();
    } catch (e) {
      throw new Error(`Error en DeviceService.createDevice ${e}`);
    }

    return saveCategory;
  }

  async updateDevice(deviceInput: UpdateDeviceInput): Promise<DeviceDocument> {
    const { id } = deviceInput;

    await this.findOneDeviceById(id);

    let updateDevice: DeviceDocument;

    try {
      updateDevice = await this.deviceModel.findByIdAndUpdate(id, deviceInput, {
        new: true,
      });
    } catch (e) {
      throw new Error(`Error en DeviceService.updateDevice ${e}`);
    }

    return updateDevice;
  }

  async deleteDevice(id: string): Promise<boolean> {
    let result = false;
    await this.findOneDeviceById(id);

    try {
      await this.deviceModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en DeviceService.deleteDevice ${e}`);
    }

    return result;
  }

  async findAllDevice(): Promise<DeviceDocument[]> {
    let findDevice: DeviceDocument[];

    try {
      findDevice = await this.deviceModel.find({ status: 1 });
    } catch (e) {
      throw new Error(`Error en DeviceService.findAllDevice ${e}`);
    }

    return findDevice;
  }

  async findOneDeviceById(id: string): Promise<DeviceDocument> {
    let device: DeviceDocument;

    try {
      device = await this.deviceModel.findById(id);
    } catch (e) {
      throw new Error(`Error en DeviceService.findOneDeviceById ${e}`);
    }

    //if does not exist
    if (!device)
      throw new BadRequestException({
        path: 'device',
        message: [`El dispositivo no se encuentra o no existe`],
      });

    return device;
  }

  async findOneDeviceByName(
    name: string,
    param: string,
  ): Promise<DeviceDocument> {
    let device: DeviceDocument;

    try {
      device = await this.deviceModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en DeviceService.findOneDeviceByName ${e}`);
    }

    switch (param) {
      case EXIST:
        if (device)
          throw new BadRequestException({
            path: 'device',
            message: [`El dispositivo ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!device)
          throw new BadRequestException({
            path: 'device',
            message: [`El dispositivo no existe.`],
          });
        break;

      case NULL:
        return device;
    }

    return device;
  }
}
