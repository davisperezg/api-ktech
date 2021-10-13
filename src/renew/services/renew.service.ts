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
    let newRenew: RenewDocument;
    let fechafinal;

    const findVehicle = await this.vehicleService.findOneVehicleByPlate(
      vehicle,
      NOEXIST,
    );
    const findBilling = await this.billingService.findOneBillingByName(
      billing,
      NOEXIST,
    );
    const getTimeEnd = findVehicle.billigEnd.getTime();
    const dataStart = startOfDay(new Date());

    const getTimeStart = dataStart.getTime();
    let dataToUpdatedVehicle;

    if (getTimeStart > getTimeEnd) {
      //renuva cuando la fecha ya ha expirado
      fechafinal = add(dataStart, { days: findBilling.day });
      newRenew = new this.renewModel({
        ...renewInput,
        registeredBy: user,
        updatedBy: user,
        expirationDate: findVehicle.billigEnd,
        renovationStart: dataStart,
        renovationEnd: fechafinal,
        vehicle: findVehicle._id,
        billing: findBilling._id,
        status: 1,
      });

      dataToUpdatedVehicle = {
        renew: true,
        id: findVehicle._id,
        billing: billing,
        billigStart: dataStart,
        billigEnd: fechafinal,
      };
    } else {
      //renueva cuando su fecha aun no expira
      fechafinal = add(findVehicle.billigEnd, { days: findBilling.day });

      // const addDaytoStart = add(dataStart, { days: 1 });
      // console.log(addDaytoStart);

      newRenew = new this.renewModel({
        ...renewInput,
        registeredBy: user,
        updatedBy: user,
        expirationDate: findVehicle.billigEnd,
        renovationStart: dataStart,
        renovationEnd: fechafinal,
        vehicle: findVehicle._id,
        billing: findBilling._id,
        status: 1,
      });

      dataToUpdatedVehicle = {
        renew: true,
        id: findVehicle._id,
        billing: billing,
        billigStart: findVehicle.billigEnd,
        billigEnd: fechafinal,
      };
    }

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
