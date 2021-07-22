import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<ServiceDocument>,
    private readonly categoryService: CategoryService,
  ) {}

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
    const { id, category, price } = serviceInput;

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
          { ...serviceInput, price: Number(price), category: findCategory._id },
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

  async findAllServices(): Promise<ServiceDocument[]> {
    let findService: ServiceDocument[];
    try {
      findService = await this.serviceModel.find().populate([
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
