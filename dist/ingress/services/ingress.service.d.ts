import { OnModuleInit } from '@nestjs/common';
import { IngressDocument } from '../schemas/ingress.schema';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
import { UserService } from 'src/user/services/user.service';
export declare class IngressService implements OnModuleInit {
    private readonly ingressModel;
    private readonly categoryService;
    private readonly userService;
    constructor(ingressModel: Model<IngressDocument>, categoryService: CategoryService, userService: UserService);
    onModuleInit(): Promise<void>;
    createIngress(ingressInput: CreateIngressInput): Promise<IngressDocument>;
    updateIngress(ingressInput: UpdateIngressInput): Promise<IngressDocument>;
    deleteIngressById(id: string): Promise<boolean>;
    findAllIngressToDay(): Promise<IngressDocument[]>;
    findIngressByDates(start: string, end: string): Promise<IngressDocument[]>;
    findOneIngressById(id: string): Promise<IngressDocument>;
}
