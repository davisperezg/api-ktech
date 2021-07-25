import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { BrandService } from 'src/brand/services/brand.service';
import { CreateModelInput } from '../dto/inputs/create-model.input';
import { UpdateModelInput } from '../dto/inputs/update-model.input';
import { ModelDocument } from '../schemas/model.schema';
export declare class ModelService implements OnModuleInit {
    private readonly modelModel;
    private readonly brandService;
    constructor(modelModel: Model<ModelDocument>, brandService: BrandService);
    onModuleInit(): Promise<void>;
    createModel(modelInput: CreateModelInput): Promise<ModelDocument>;
    updateModel(modelInput: UpdateModelInput): Promise<ModelDocument>;
    findAllModels(): Promise<ModelDocument[]>;
    findModelsByBrand(brand: string): Promise<ModelDocument[]>;
    findOneModelById(id: string): Promise<ModelDocument>;
    findOneModelByName(name: string, param: string): Promise<ModelDocument>;
}
