import { UserDocument } from 'src/user/schemas/user.schema';
import { AccessDocument } from './../schemas/access.schema';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AccessService implements OnModuleInit {
  constructor(
    @InjectModel('Access')
    private readonly accessModel: Model<AccessDocument>,
  ) {}

  //https://docs.nestjs.com/fundamentals/lifecycle-events#asynchronous-initialization
  async onModuleInit(): Promise<AccessDocument[] | number> {
    let countAccess: number;
    let valuesAccess: AccessDocument[];

    try {
      countAccess = await this.accessModel.estimatedDocumentCount();
    } catch (e) {
      throw new Error(`Error en AccessService.onModuleInit.Count ${e}`);
    }

    if (countAccess > 0) return;

    try {
      valuesAccess = await Promise.all([
        new this.accessModel({ name: 'Editar' }).save(),
        new this.accessModel({ name: 'Eliminar' }).save(),
        new this.accessModel({ name: 'Crear' }).save(),
        new this.accessModel({ name: 'Ver' }).save(),
      ]);
    } catch (e) {
      throw new Error(`Error en AccessService.onModuleInit.All ${e}`);
    }

    return valuesAccess;
  }

  async findAllAccess(): Promise<AccessDocument[]> {
    let findAccess: AccessDocument[];

    try {
      findAccess = await this.accessModel.find();
    } catch (e) {
      throw new Error(`Error en AccessService.findAllAccess ${e}`);
    }

    return findAccess;
  }

  //Get one access
  async findOneAccessById(id: string): Promise<AccessDocument> {
    let access: AccessDocument;

    try {
      access = await this.accessModel.findById(id);
    } catch (e) {
      throw new Error(`Error en AccessService.findOneAccessById ${e}`);
    }

    //if does not exist
    if (!access)
      throw new NotFoundException(`El access no se encuentra o no existe`);

    return access;
  }

  //Get accesses by names
  async findAccessesByNames(param: string[]): Promise<AccessDocument[]> {
    let accesses: AccessDocument[];

    try {
      accesses = await this.accessModel.find({ name: { $in: param } });
    } catch (e) {
      throw new Error(`Error en ModuleService.findModulesByNames ${e}`);
    }

    if (!accesses || accesses.length === 0)
      throw new NotFoundException({
        path: 'access',
        message: [`El tipo de acceso no se encuentra o no existe`],
      });

    return accesses;
  }

  async findIdsByNameAccess(accesses: any[]): Promise<AccessDocument[]> {
    const getNameAccess = accesses.map((access) => access.name);

    const findAccessByName = await this.findAccessesByNames(getNameAccess);

    const getIdAccess = findAccessByName.map((access) => access._id);

    return getIdAccess;
  }
}
