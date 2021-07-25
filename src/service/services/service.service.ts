import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from 'src/category/schemas/category.schema';
import { CategoryService } from 'src/category/services/category.service';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateServiceInput } from '../dto/inputs/create-service.input';
import { UpdateServiceInput } from '../dto/inputs/update-service.input';
import { ServiceDocument } from '../schemas/service.schema';

@Injectable()
export class ServiceService implements OnModuleInit {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<ServiceDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.serviceModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en ServiceService.onModuleInit ${e}`);
    }
  }

  async createService(
    serviceInput: CreateServiceInput,
  ): Promise<ServiceDocument> {
    const { name, category } = serviceInput;

    await this.findOneServiceByName(name, EXIST);

    const findCategory = await this.categoryService.findOneCategoryByName(
      category,
      NOEXIST,
    );

    const newService = new this.serviceModel({
      ...serviceInput,
      category: findCategory._id,
      status: 1,
    });

    let serviceSaved: ServiceDocument;
    let foundService: ServiceDocument;

    try {
      serviceSaved = await newService.save();
    } catch (e) {
      throw new Error(`Error en ModelService.createService ${e}`);
    }

    try {
      foundService = await serviceSaved
        .populate([{ path: 'category' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en ServiceService.createService.list ${e}`);
    }

    return foundService;
  }

  async updateService(
    serviceInput: UpdateServiceInput,
  ): Promise<ServiceDocument> {
    const { id, category } = serviceInput;

    let findCategory: CategoryDocument;
    let updateService: ServiceDocument;

    const findServiceById = await this.findOneServicesById(id);

    if (category) {
      findCategory = await this.categoryService.findOneCategoryByName(
        category,
        NOEXIST,
      );
    } else {
      findCategory = await this.categoryService.findOneCategoryByName(
        findServiceById.category.name,
        NULL,
      );
    }

    try {
      updateService = await this.serviceModel
        .findByIdAndUpdate(
          id,
          { ...serviceInput, category: findCategory._id },
          { new: true },
        )
        .populate([
          {
            path: 'category',
          },
        ]);
    } catch (e) {
      throw new Error(`Error en ServiceService.updateService ${e}`);
    }

    return updateService;
  }

  async deleteServiceById(id: string): Promise<boolean> {
    let result = false;
    await this.findOneServicesById(id);

    try {
      await this.serviceModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en ServiceService.deleteServiceById ${e}`);
    }

    return result;
  }

  async findAllServices(): Promise<ServiceDocument[]> {
    let findService: ServiceDocument[];
    try {
      findService = await this.serviceModel.find({ status: 1 }).populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ServiceService.findAllServices ${e}`);
    }

    return findService;
  }

  async findOneServicesById(id: string): Promise<ServiceDocument> {
    let service: ServiceDocument;

    try {
      service = await this.serviceModel.findById(id).populate([
        {
          path: 'category',
        },
      ]);
    } catch (e) {
      throw new Error(`Error en ServiceService.findOneServicesById ${e}`);
    }

    //if does not exist
    if (!service)
      throw new NotFoundException({
        path: `service`,
        message: `El servicio no se encuentra o no existe`,
      });

    return service;
  }

  async findOneServiceByName(
    name: string,
    param: string,
  ): Promise<ServiceDocument> {
    let service: ServiceDocument;

    try {
      service = await this.serviceModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en ServiceService.findOneServiceByName${e}`);
    }

    switch (param) {
      case EXIST:
        if (service)
          throw new BadRequestException({
            path: 'service',
            message: [`El servicio ${name} ya existe.`],
          });
        break;

      case NOEXIST:
        if (!service)
          throw new BadRequestException({
            path: 'service',
            message: [`El servicio no existe.`],
          });
        break;
    }

    return service;
  }
}
