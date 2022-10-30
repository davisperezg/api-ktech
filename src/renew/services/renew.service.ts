import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingService } from 'src/billing/services/billing.service';
import { allMonthsLocal, NOEXIST } from 'src/lib/conts';
import { UserService } from 'src/user/services/user.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { CreateRenewInput } from '../dto/inputs/create-renew.input';
import { RenewDocument } from '../schemas/renew.schema';
import { startOfDay, add, endOfDay, format, isBefore } from 'date-fns';
import { UpdateVehicleInput } from 'src/vehicle/dto/inputs/update-vehicle.input';
import { UpdateRenewInput } from '../dto/inputs/update-renew.input';
import { CanceledService } from 'src/renews-canceled/services/canceled.service';

@Injectable()
export class RenewService {
  constructor(
    @InjectModel('Renew')
    private readonly renewModel: Model<RenewDocument>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService,
    private readonly billingService: BillingService,
    private readonly canceledService: CanceledService,
  ) {}

  async createRenew(renewInput: CreateRenewInput, user: string) {
    const { vehicle, billing, billingPayToday, billingTime } = renewInput;
    let newRenew: RenewDocument;
    let fechafinal;

    const findVehicle = await this.vehicleService.findOneVehicleByPlate(
      vehicle,
      'NOEXIST',
    );

    const findBilling = await this.billingService.findOneBillingById(billing);

    const isDefeated = isBefore(findVehicle.billigEnd, new Date());
    const dateStart = startOfDay(new Date());
    let dataToUpdatedVehicle;

    if (isDefeated) {
      if (billingPayToday !== 'SI' && billingPayToday !== 'NO') {
        throw new NotFoundException({
          path: `renew`,
          message: [`Por favor renueve al cliente cuando este ya aya vencido.`],
        });
      }

      if (billingPayToday === 'SI') {
        const searchPositionMonth = (month: string) =>
          allMonthsLocal.indexOf(month);
        const getDayPayed = format(findVehicle.billigStart, 'dd');
        const getDayFinalPast = format(findVehicle.billigEnd, 'dd');
        const getFinalPayed = billingTime[billingTime.length - 1];
        const getEndYearPayed = getFinalPayed.year;
        const getEndMonthPayed =
          getFinalPayed.months[getFinalPayed.months.length - 1];
        const getMonthInNumber = searchPositionMonth(getEndMonthPayed);
        const getDaysDiffStartEndPast =
          Number(getDayPayed) !== Number(getDayFinalPast)
            ? getDayFinalPast
            : getDayPayed;
        const datePayedInDate = new Date(
          Number(getEndYearPayed),
          Number(getMonthInNumber),
          Number(getDaysDiffStartEndPast),
        );
        const addDaysToDatePayed = add(datePayedInDate, {
          days: findBilling.day,
        });

        newRenew = new this.renewModel({
          ...renewInput,
          registeredBy: user,
          updatedBy: user,
          expirationDate: findVehicle.billigEnd,
          renovationStart: datePayedInDate,
          renovationEnd: addDaysToDatePayed,
          vehicle: findVehicle._id,
          billing: findBilling._id,
          status: 1,
        });
        dataToUpdatedVehicle = {
          renew: true,
          id: findVehicle._id,
          billing: billing,
          billigStart: datePayedInDate,
          billigEnd: addDaysToDatePayed,
        };
      }
      if (billingPayToday === 'NO') {
        const dateEndBilling = add(dateStart, { days: findBilling.day });
        newRenew = new this.renewModel({
          ...renewInput,
          registeredBy: user,
          updatedBy: user,
          expirationDate: findVehicle.billigEnd,
          renovationStart: dateStart,
          renovationEnd: dateEndBilling,
          vehicle: findVehicle._id,
          billing: findBilling._id,
          status: 1,
        });
        dataToUpdatedVehicle = {
          renew: true,
          id: findVehicle._id,
          billing: billing,
          billigStart: dateStart,
          billigEnd: dateEndBilling,
        };
      }
    } else {
      if (billingPayToday !== '') {
        throw new BadRequestException({
          path: 'renew',
          message: [
            `No se permite el ingreso de "dia de pago". No hemos podido renovar el vehiculo.`,
          ],
        });
      }

      //renueva cuando su fecha aun no expira
      fechafinal = add(findVehicle.billigEnd, { days: findBilling.day });
      newRenew = new this.renewModel({
        ...renewInput,
        registeredBy: user,
        updatedBy: user,
        expirationDate: findVehicle.billigEnd,
        renovationStart: findVehicle.billigStart,
        renovationEnd: fechafinal,
        vehicle: findVehicle._id,
        billing: findBilling._id,
        status: 1,
      });
      dataToUpdatedVehicle = {
        renew: true,
        id: findVehicle._id,
        billing: billing,
        billigStart: findVehicle.billigStart,
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

  async toCheck(renewInput: UpdateRenewInput): Promise<RenewDocument> {
    const { id } = renewInput;

    let updateRenew: RenewDocument;

    try {
      updateRenew = await this.renewModel.findByIdAndUpdate(
        id,
        {
          ...renewInput,
          status: 2,
        },
        {
          new: true,
        },
      );

      await this.canceledService.createCanceled({
        renew: updateRenew._id,
      });
    } catch (e) {
      throw new Error(`Error en RenewService.toCheck ${e}`);
    }

    return updateRenew;
  }

  async findAllRenews(): Promise<RenewDocument[]> {
    let findRenew: RenewDocument[];
    try {
      findRenew = await this.renewModel
        .find({ status: 1 })
        .populate([
          { path: 'vehicle', populate: [{ path: 'customer' }] },
          { path: 'billing' },
          { path: 'registeredBy' },
          { path: 'updatedBy' },
        ]);
    } catch (e) {
      throw new Error(`Error en RenewService.findAllRenews ${e}`);
    }

    return findRenew;
  }

  async findAllRenewsById(id: string): Promise<RenewDocument> {
    let findRenew: RenewDocument;
    try {
      findRenew = await this.renewModel
        .findById(id, { status: 1 })
        .populate([
          { path: 'vehicle', populate: [{ path: 'customer' }] },
          { path: 'billing' },
          { path: 'registeredBy' },
          { path: 'updatedBy' },
        ]);
    } catch (e) {
      throw new Error(`Error en RenewService.findAllRenewsById ${e}`);
    }

    return findRenew;
  }

  async findAllRenewsByVehicle(id: string): Promise<RenewDocument[]> {
    let findRenew: RenewDocument[];

    const getVehicleWithPlate = await this.vehicleService.findOneVehicleByPlate(
      id,
      'NOEXITS',
    );

    try {
      findRenew = await this.renewModel
        .find({
          vehicle: getVehicleWithPlate._id,
        })
        .populate([
          { path: 'vehicle', populate: [{ path: 'customer' }] },
          { path: 'billing' },
          { path: 'registeredBy' },
          { path: 'updatedBy' },
        ]);
    } catch (e) {
      throw new Error(`Error en RenewService.findAllRenewsByVehicle ${e}`);
    }

    return findRenew;
  }

  async buscarRenovacionesXFecha(
    desde: Date | string,
    hasta: Date | string,
  ): Promise<RenewDocument[]> {
    let vehiculos: RenewDocument[];

    const desdeTest = startOfDay(new Date(desde));
    const addDesde = add(desdeTest, { days: 1 });

    const hastaTest = endOfDay(new Date(hasta));
    const addHasta = add(hastaTest, { days: 1 });

    try {
      vehiculos = await this.renewModel
        .find({
          status: 1,
          createdAt: {
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
    } catch (e) {
      throw new Error(`Error en RenewService.buscarRenovacionesXFecha ${e}`);
    }

    return vehiculos;
  }
}
