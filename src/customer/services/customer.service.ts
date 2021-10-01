import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EXIST, NOEXIST, NULL } from 'src/lib/conts';
import { CreateCustomerInput } from '../dto/inputs/create-customer.input';
import { UpdateCustomerInput } from '../dto/inputs/update-customer.input';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async createCustomer(
    customerInput: CreateCustomerInput,
  ): Promise<CustomerDocument> {
    const { numDocument, cellphone_1, cellphone_2 } = customerInput;

    await this.findOneCustomerByNroDocument(numDocument, EXIST);

    await this.findOneCustomerByCellphoneOne(cellphone_1, EXIST);

    await this.findOneCustomerByCellphoneTwo(cellphone_1, EXIST);

    if (cellphone_2) {
      await this.findOneCustomerByCellphoneTwo(cellphone_2, EXIST);
      await this.findOneCustomerByCellphoneOne(cellphone_2, EXIST);
    }

    let customerSaved: CustomerDocument;
    const newCustomer = new this.customerModel({
      ...customerInput,
      status: 1,
    });
    try {
      customerSaved = await newCustomer.save();
    } catch (e) {
      throw new Error(`Error en CustomerService.createCustomer ${e}`);
    }

    return customerSaved;
  }

  async updateCustomer(
    customerInput: UpdateCustomerInput,
  ): Promise<CustomerDocument> {
    const {
      id,
      numDocument,
      cellphone_1,
      cellphone_2,
      direction,
    } = customerInput;

    let updateCustomer: CustomerDocument;
    const findCustomerById: any = await this.findOneCustomerById(id);

    if (numDocument !== findCustomerById.numDocument) {
      await this.findOneCustomerByNroDocument(numDocument, EXIST);
    }

    if (cellphone_1 !== findCustomerById.cellphone_1) {
      await this.findOneCustomerByCellphoneOne(cellphone_1, EXIST);
    }

    if (cellphone_1 !== findCustomerById.cellphone_2) {
      await this.findOneCustomerByCellphoneTwo(cellphone_1, EXIST);
    }

    if (!cellphone_2) {
      customerInput.cellphone_2 = '';
    } else {
      if (cellphone_2 !== findCustomerById.cellphone_2) {
        await this.findOneCustomerByCellphoneTwo(cellphone_2, EXIST);
      }
      if (cellphone_2 !== findCustomerById.cellphone_1) {
        await this.findOneCustomerByCellphoneOne(cellphone_2, EXIST);
      }
    }

    if (!direction) {
      customerInput.direction = '';
    }

    try {
      updateCustomer = await this.customerModel.findByIdAndUpdate(
        id,
        customerInput,
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en CustomerService.updateCustomer ${e}`);
    }

    return updateCustomer;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    let result = false;
    await this.findOneCustomerById(id);

    try {
      await this.customerModel.findByIdAndUpdate(id, { status: 2 });
      result = true;
    } catch (e) {
      throw new Error(`Error en CustomerService.deleteCustomer ${e}`);
    }

    return result;
  }

  async findAllCustomer(): Promise<CustomerDocument[]> {
    let findCustomer: CustomerDocument[];

    try {
      findCustomer = await this.customerModel.find({ status: 1 });
    } catch (e) {
      throw new Error(`Error en CustomerService.findAllCustomer ${e}`);
    }

    return findCustomer;
  }

  async findOneCustomerById(id: string): Promise<CustomerDocument> {
    let customer: CustomerDocument;

    try {
      customer = await this.customerModel.findById(id);
    } catch (e) {
      throw new Error(`Error en CustomerService.findOneCustomerById ${e}`);
    }

    //if does not exist
    if (!customer)
      throw new NotFoundException({
        path: `customer`,
        message: [`El cliente no se encuentra o no existe`],
      });

    return customer;
  }

  async findOneCustomerByNroDocument(
    number: string,
    param: string,
  ): Promise<CustomerDocument> {
    let customer: CustomerDocument;

    try {
      customer = await this.customerModel.findOne({ numDocument: number });
    } catch (e) {
      throw new Error(
        `Error en CustomerService.findOneCustomerByNroDocument ${e}`,
      );
    }

    switch (param) {
      case EXIST:
        if (customer)
          throw new BadRequestException({
            path: 'customer',
            message: [
              `El cliente con nro de documento ${number} ya existe y le pertenece a otro cliente.`,
            ],
          });
        break;

      case NOEXIST:
        if (!customer)
          throw new BadRequestException({
            path: 'customer',
            message: [`El cliente no existe.`],
          });
        break;
    }

    return customer;
  }

  async findOneCustomerByCellphoneOne(
    number: string,
    param: string,
  ): Promise<CustomerDocument> {
    let customer: CustomerDocument;

    try {
      customer = await this.customerModel.findOne({ cellphone_1: number });
    } catch (e) {
      throw new Error(
        `Error en CustomerService.findOneCustomerByCellphoneOne ${e}`,
      );
    }

    switch (param) {
      case EXIST:
        if (customer)
          throw new BadRequestException({
            path: 'customer',
            message: [
              `El cliente con nro de celular ${number} ya existe y le pertenece a otro cliente.`,
            ],
          });
        break;

      case NOEXIST:
        if (!customer)
          throw new BadRequestException({
            path: 'customer',
            message: [`El nro de celular principal del cliente no existe.`],
          });
        break;
    }

    return customer;
  }

  async findOneCustomerByCellphoneTwo(
    number: string,
    param: string,
  ): Promise<CustomerDocument> {
    let customer: CustomerDocument;

    try {
      customer = await this.customerModel.findOne({ cellphone_2: number });
    } catch (e) {
      throw new Error(
        `Error en CustomerService.findOneCustomerByCellphoneTwo ${e}`,
      );
    }

    switch (param) {
      case EXIST:
        if (customer)
          throw new BadRequestException({
            path: 'customer',
            message: [
              `El cliente con nro de celular ${number} ya existe y le pertenece a otro cliente.`,
            ],
          });
        break;

      case NOEXIST:
        if (!customer)
          throw new BadRequestException({
            path: 'customer',
            message: [`El nro de celular opcional del cliente no existe.`],
          });
        break;
    }

    return customer;
  }

  async findOneCustomerByLastname(
    lastName: string,
    param: string,
  ): Promise<CustomerDocument> {
    let customer: CustomerDocument;
    console.log(lastName);
    console.log(param);
    try {
      customer = await this.customerModel.findOne({ lastName });
      console.log(customer);
    } catch (e) {
      throw new Error(`Error en CustomerService.findOneCustomerByName ${e}`);
    }

    switch (param) {
      case EXIST:
        if (customer)
          throw new BadRequestException({
            path: 'customer',
            message: [
              `El cliente ${customer.name} ${customer.lastName} ya existe.`,
            ],
          });
        break;

      case NOEXIST:
        if (!customer)
          throw new BadRequestException({
            path: 'customer',
            message: [`El cliente no existe.`],
          });
        break;

      case NULL:
        return customer;
    }

    return customer;
  }
}
