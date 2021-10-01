import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingService } from 'src/billing/services/billing.service';
import { NOEXIST } from 'src/lib/conts';
import { UserService } from 'src/user/services/user.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { RenewDocument } from '../schemas/renew.schema';
import { startOfDay, add, endOfDay } from 'date-fns';
import { UpdateVehicleInput } from 'src/vehicle/dto/inputs/update-vehicle.input';

import * as moment from 'moment';

@Injectable()
export class RenewService {
  constructor(
    @InjectModel('Renew')
    private readonly renewModel: Model<RenewDocument>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService,
    private readonly billingService: BillingService,
  ) {}

  async createRenew(renewInput: CreateRenewInput, user: string) {
    const { vehicle, billing } = renewInput;

    const findVehicle = await this.vehicleService.findOneVehicleByPlate(
      vehicle,
      NOEXIST,
    );
    const findBilling = await this.billingService.findOneBillingByName(
      billing,
      NOEXIST,
    );

    //validar

    // const getTimeEnd = findVehicle.billigEnd.getTime();
     const dataStart = startOfDay(new Date());
     console.log(dataStart)
    // const getTimeStart = dataStart.getTime();
    
    // if (getTimeEnd > getTimeStart) {
    //   throw new NotFoundException({
    //     path: 'renew',
    //     message: [
    //       `El vehiculo con placa ${
    //         findVehicle.plate
    //       } no puede renovarse porque aun no caduca. Termina el ${moment(
    //         findVehicle.billigEnd,
    //       ).format('DD/MM/YYYY')}`,
    //     ],
    //   });
    // }
     const nueva_fecha = add(findVehicle.billigEnd, { days: findBilling.day });
    

    // const addDaytoStart = add(dataStart, { days: 1 });
    // console.log(addDaytoStart);
    // const addDaytoEnd = add(dataStart, { days: findBilling.day });

    const newRenew = new this.renewModel({
      ...renewInput,
      registeredBy: user,
      updatedBy: user,
      expirationDate: findVehicle.billigEnd,
      renovationStart: dataStart,
      renovationEnd: nueva_fecha,
      vehicle: findVehicle._id,
      billing: findBilling._id,
      status: 1,
    });

    let vehicleSaved: RenewDocument;

    try {
      vehicleSaved = await (await newRenew.save())
        .populate([
          { path: 'vehicle' },
          { path: 'billing' },
          { path: 'registeredBy' },
          { path: 'updatedBy' },
        ])
        .execPopulate();

      const dataToUpdatedVehicle = {
        renew: true,
        id: findVehicle._id,
        billing: billing,
        billigStart: dataStart,
        billigEnd: nueva_fecha,
      };

      await this.vehicleService.updateVehicle(dataToUpdatedVehicle, user);
    } catch (e) {
      throw new Error(`Error en RenewService.createRenew ${e}`);
    }

    return vehicleSaved;
  }

  async findAllRenews(): Promise<RenewDocument[]> {
    let findRenew: RenewDocument[];
    try {
      findRenew = await this.renewModel
        .find({ status: 1 })
        .populate([
          { path: 'vehicle' },
          { path: 'billing' },
          { path: 'registeredBy' },
          { path: 'updatedBy' },
        ]);
    } catch (e) {
      throw new Error(`Error en RenewService.findAllRenews ${e}`);
    }

    return findRenew;
  }
  async buscarRenovacionesXFecha(
    desde: Date | string,
    hasta: Date | string,
  ): Promise<RenewDocument[]> {
    let vehiculos: RenewDocument[];
    console.log(desde);
    console.log(hasta);

    const desdeTest = startOfDay(new Date(desde));
    const addDesde = add(desdeTest, { days: 1 });
    console.log(addDesde);

    const hastaTest = endOfDay(new Date(hasta));
    const addHasta = add(hastaTest, { days: 1 });
    console.log(addHasta);

    try {
      vehiculos = await this.renewModel
        .find({
          status: 1,
          renovationStart: {
            $gte: addDesde,
            $lt: addHasta,
          },
        })
        .populate([
          {
            path: 'vehicle',
            populate: [{ path: 'customer' }, { path: 'device' }],
          },
          { path: 'billing' },
        ]);

      console.log(vehiculos);
    } catch (e) {
      throw new Error(`Error en RenewService.buscarRenovacionesXFecha ${e}`);
    }

    return vehiculos;
  }
}
