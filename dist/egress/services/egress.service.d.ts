import { OnModuleInit } from '@nestjs/common';
import { EgressDocument } from '../schemas/egress.schema';
import { Model } from 'mongoose';
import { CreateEgressInput } from '../dto/inputs/create-egress.input';
import { CategoryService } from 'src/category/services/category.service';
import { UpdateEgressInput } from '../dto/inputs/update-egress.input';
import { UserService } from 'src/user/services/user.service';
export declare class EgressService implements OnModuleInit {
    private readonly egressModel;
    private readonly categoryService;
    private readonly userService;
    constructor(egressModel: Model<EgressDocument>, categoryService: CategoryService, userService: UserService);
    onModuleInit(): Promise<void>;
    createEgress(egressInput: CreateEgressInput): Promise<EgressDocument>;
    updateEgress(egressInput: UpdateEgressInput): Promise<EgressDocument>;
    deleteEgressById(id: string): Promise<boolean>;
    findAllEgressToDay(): Promise<EgressDocument[]>;
    findEgressByDates(start: string, end: string): Promise<EgressDocument[]>;
    findAllEgress(): Promise<EgressDocument[]>;
    findOneEgressById(id: string): Promise<EgressDocument>;
}
