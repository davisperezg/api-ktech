import { Model } from 'mongoose';
import { CreateDeviceInput } from '../dto/inputs/create-device.input';
import { UpdateDeviceInput } from '../dto/inputs/update-device.input';
import { DeviceDocument } from '../schemas/device.schema';
export declare class DeviceService {
    private readonly deviceModel;
    constructor(deviceModel: Model<DeviceDocument>);
    createDevice(deviceInput: CreateDeviceInput): Promise<DeviceDocument>;
    updateDevice(deviceInput: UpdateDeviceInput): Promise<DeviceDocument>;
    deleteDevice(id: string): Promise<boolean>;
    findAllDevice(): Promise<DeviceDocument[]>;
    findOneDeviceById(id: string): Promise<DeviceDocument>;
    findOneDeviceByName(name: string, param: string): Promise<DeviceDocument>;
}
