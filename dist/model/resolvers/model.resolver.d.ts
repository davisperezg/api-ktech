import { CreateModelInput } from '../dto/inputs/create-model.input';
import { ModelService } from '../services/model.service';
import { UpdateModelInput } from '../dto/inputs/update-model.input';
import { ModelDocument } from '../schemas/model.schema';
export declare class ModelResolver {
    private readonly modelService;
    constructor(modelService: ModelService);
    registerModel(modelInput: CreateModelInput): Promise<ModelDocument>;
    updateModel(modelInput: UpdateModelInput): Promise<ModelDocument>;
    getModels(): Promise<ModelDocument[]>;
    getModelsByBrand(brand: string): Promise<ModelDocument[]>;
}
