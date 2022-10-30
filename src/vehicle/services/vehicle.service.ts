import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingDocument } from 'src/billing/schemas/billing.schema';
import { BillingService } from 'src/billing/services/billing.service';
import { CustomerDocument } from 'src/customer/schemas/customer.schema';
import { CustomerService } from 'src/customer/services/customer.service';
import { DeviceDocument } from 'src/device/schemas/device.schema';
import { DeviceService } from 'src/device/services/device.service';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateVehicleInput } from '../dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/inputs/update-vehicle.input';
import { VehicleDocument } from '../schemas/vehicle.schema';
import { startOfDay, add, endOfDay } from 'date-fns';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel('Vehicle')
    private readonly vehicleModel: Model<VehicleDocument>,
    private readonly customerService: CustomerService,
    private readonly deviceService: DeviceService,
    private readonly billingService: BillingService,
  ) {}

  async createVehicle(vehicleInput: CreateVehicleInput, user: string) {
    const { customer, device, billing, plate, nroGPS } = vehicleInput;

    const findCustomer = await this.customerService.findOneCustomerById(
      customer,
    );
    const findDevice = await this.deviceService.findOneDeviceById(device);
    const findBilling = await this.billingService.findOneBillingById(billing);

    await this.findOneVehicleByPlate(plate, EXIST);
    await this.findOneVehicleByNroGPS(nroGPS, EXIST);

    const dataStart = startOfDay(new Date());
    //const addDaytoStart = add(dataStart, { days: 1 });
    const addDaytoEnd = add(dataStart, { days: findBilling.day });

    const newVehicle = new this.vehicleModel({
      ...vehicleInput,
      customer: findCustomer._id,
      device: findDevice._id,
      billing: findBilling._id,
      billigStart: dataStart,
      billigEnd: addDaytoEnd,
      createdBy: user,
      updatedBy: user,
      status: 1,
      retired: false,
    });

    let vehicleSaved: VehicleDocument;
    let foundVehicle: VehicleDocument;

    try {
      vehicleSaved = await newVehicle.save();
    } catch (e) {
      throw new Error(`Error en VehicleService.createVehicle ${e}`);
    }

    try {
      foundVehicle = await vehicleSaved
        .populate([
          { path: 'customer' },
          { path: 'device' },
          { path: 'billing' },
          { path: 'createdBy' },
          { path: 'updatedBy' },
        ])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en VehicleService.createVehicle.list ${e}`);
    }

    return foundVehicle;
  }

  async updateVehicle(
    vehicleInput: UpdateVehicleInput | any,
    user: string,
  ): Promise<VehicleDocument> {
    const {
      id,
      customer,
      device,
      billing,
      //billigStart,
      renew,
      //billigEnd,
      nroGPS,
      plate,
    } = vehicleInput;

    let findCustomer: CustomerDocument;
    let findDevice: DeviceDocument;
    let findBilling: BillingDocument;
    let updateVehicle: VehicleDocument;

    const findVehicleById: any = await this.findOneVehicleById(id);

    if (nroGPS !== findVehicleById.nroGPS) {
      await this.findOneVehicleByNroGPS(nroGPS, EXIST);
    }

    if (plate !== findVehicleById.plate) {
      await this.findOneVehicleByPlate(plate, EXIST);
    }

    if (customer) {
      findCustomer = await this.customerService.findOneCustomerById(customer);
    } else {
      findCustomer = await this.customerService.findOneCustomerById(
        findVehicleById.customer._id,
      );
    }

    if (device) {
      findDevice = await this.deviceService.findOneDeviceById(device);
    } else {
      findDevice = await this.deviceService.findOneDeviceById(
        findVehicleById.device._id,
      );
    }

    if (renew === false && billing) {
      throw new NotFoundException({
        path: `billing`,
        message: [`Valor no permitido`],
      });
    }

    if (billing) {
      findBilling = await this.billingService.findOneBillingById(billing);
    } else {
      findBilling = await this.billingService.findOneBillingById(
        findVehicleById.billing._id,
      );
    }

    try {
      updateVehicle = await this.vehicleModel
        .findByIdAndUpdate(
          id,
          {
            ...vehicleInput,
            customer: findCustomer._id,
            device: findDevice._id,
            billing: findBilling._id,
            billigStart: renew
              ? vehicleInput.billigStart
              : findVehicleById.billigStart,
            billigEnd: renew
              ? vehicleInput.billigEnd
              : findVehicleById.billigEnd,
            updatedBy: user,
          },
          { new: true },
        )
        .populate([
          {
            path: 'customer',
          },
          {
            path: 'device',
          },
          {
            path: 'billing',
          },
          { path: 'createdBy' },
          { path: 'updatedBy' },
        ]);
    } catch (e) {
      throw new Error(`Error en VehicleService.updateVehicle ${e}`);
    }

    return updateVehicle;
  }

  async findOneVehicleById(id: string): Promise<VehicleDocument> {
    let vehicle: VehicleDocument;

    try {
      vehicle = await this.vehicleModel.findById(id).populate([
        {
          path: 'customer',
        },
        {
          path: 'device',
        },
        {
          path: 'billing',
        },
        { path: 'createdBy' },
        { path: 'updatedBy' },
      ]);
    } catch (e) {
      throw new Error(`Error en VehicleService.findOneVehicleById ${e}`);
    }

    //if does not exist
    if (!vehicle)
      throw new NotFoundException({
        path: `vehicle`,
        message: [`El vehiculo no se encuentra o no existe`],
      });

    return vehicle;
  }

  async deleteVehicleById(id: string): Promise<boolean> {
    let result = false;

    await this.findOneVehicleById(id);

    try {
      await this.vehicleModel.findByIdAndUpdate(id, { status: 2 });

      result = true;
    } catch (e) {
      throw new Error(`Error en VehicleService.deleteVehicleById ${e}`);
    }

    return result;
  }

  async findAllVehicle(): Promise<VehicleDocument[]> {
    let findVehicle: VehicleDocument[];
    try {
      findVehicle = await this.vehicleModel.find({ status: 1 }).populate([
        {
          path: 'customer',
        },
        {
          path: 'device',
        },
        {
          path: 'billing',
        },
        { path: 'createdBy' },
        { path: 'updatedBy' },
      ]);
    } catch (e) {
      throw new Error(`Error en VehicleService.findAllVehicle ${e}`);
    }

    return findVehicle;
  }

  async findOneVehicleByPlate(
    plate: string,
    param: string,
  ): Promise<VehicleDocument> {
    let vehicle: VehicleDocument;

    try {
      vehicle = await this.vehicleModel.findOne({ plate });
    } catch (e) {
      throw new Error(`Error en VehicleService.findOneVehicleByPlate${e}`);
    }

    switch (param) {
      case EXIST:
        if (vehicle)
          throw new BadRequestException({
            path: 'vehicle',
            message: [
              `El vehiculo con placa ${plate} ya existe y le pertenece a otro vehículo.`,
            ],
          });
        break;

      case NOEXIST:
        if (!vehicle)
          throw new BadRequestException({
            path: 'vehicle',
            message: [`El vehiculo no existe.`],
          });
        break;
    }

    return vehicle;
  }

  async findOneVehicleByNroGPS(
    nroGPS: string,
    param: string,
  ): Promise<VehicleDocument> {
    let vehicle: VehicleDocument;

    try {
      vehicle = await this.vehicleModel.findOne({ nroGPS });
    } catch (e) {
      throw new Error(`Error en VehicleService.findOneVehicleByPlate${e}`);
    }

    switch (param) {
      case EXIST:
        if (vehicle)
          throw new BadRequestException({
            path: 'vehicle',
            message: [
              `El vehiculo con chip ${nroGPS} ya existe y le pertenece a otro vehículo.`,
            ],
          });
        break;

      case NOEXIST:
        if (!vehicle)
          throw new BadRequestException({
            path: 'vehicle',
            message: [`El vehiculo no existe.`],
          });
        break;
    }

    return vehicle;
  }

  async buscarXrangoFechaInstalaciones(
    desde: Date | string,
    hasta: Date | string,
  ): Promise<VehicleDocument[]> {
    let vehiculos: VehicleDocument[];

    const desdeTest = startOfDay(new Date(desde));
    const addDesde = add(desdeTest, { days: 1 });

    const hastaTest = endOfDay(new Date(hasta));
    const addHasta = add(hastaTest, { days: 1 });

    try {
      vehiculos = await this.vehicleModel
        .find({
          status: 1,
          createdAt: {
            $gte: addDesde,
            $lt: addHasta,
          },
        })
        .populate([
          {
            path: 'customer',
          },
          { path: 'billing' },
          { path: 'device' },
        ]);
    } catch (e) {
      throw new Error(
        `Error en VehicleService.buscarXrangoFechaInstalaciones ${e}`,
      );
    }

    return vehiculos;
  }

  async buscarVencidosXrangoFechas(
    desde: Date | string,
    hasta: Date | string,
  ): Promise<VehicleDocument[]> {
    let vehiculos: VehicleDocument[];

    const desdeTest = startOfDay(new Date(desde));
    const addDesde = add(desdeTest, { days: 1 });

    const hastaTest = endOfDay(new Date(hasta));
    const addHasta = add(hastaTest, { days: 1 });

    try {
      vehiculos = await this.vehicleModel
        .find({
          status: 1,
          billigEnd: {
            $gte: addDesde,
            $lt: addHasta,
          },
        })
        .populate([
          {
            path: 'billing',
          },
          { path: 'customer' },
          { path: 'device' },
        ]);
    } catch (e) {
      throw new Error(
        `Error en VehicleService.buscarVencidosXrangoFechas ${e}`,
      );
    }

    return vehiculos;
  }
}
