import { DeviceService } from '../services/device.service';
import { CreateDeviceInput } from '../dto/inputs/create-device.input';
import { UpdateDeviceInput } from '../dto/inputs/update-device.input';
import { DeviceDocument } from '../schemas/device.schema';
export declare class DeviceResolver {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    registerDevice(deviceInput: CreateDeviceInput): Promise<DeviceDocument>;
    updateDevice(deviceInput: UpdateDeviceInput): Promise<DeviceDocument>;
    deleteDevice(id: string): Promise<boolean>;
    getDevices(): Promise<DeviceDocument[]>;
}
