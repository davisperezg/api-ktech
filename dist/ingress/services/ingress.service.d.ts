import { OnModuleInit } from '@nestjs/common';
import { IngressDocument } from '../schemas/ingress.schema';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
export declare class IngressService implements OnModuleInit {
    private readonly ingressModel;
    private readonly categoryService;
    constructor(ingressModel: Model<IngressDocument>, categoryService: CategoryService);
    onModuleInit(): Promise<void>;
    createIngress(ingressInput: CreateIngressInput): Promise<IngressDocument>;
    updateIngress(ingressInput: UpdateIngressInput): Promise<IngressDocument>;
    deleteIngressById(id: string): Promise<boolean>;
    findAllIngress(): Promise<IngressDocument[]>;
    findOneIngressById(id: string): Promise<IngressDocument>;
}
