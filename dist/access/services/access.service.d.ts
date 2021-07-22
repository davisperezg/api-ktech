import { AccessDocument } from './../schemas/access.schema';
import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
export declare class AccessService implements OnModuleInit {
    private readonly accessModel;
    constructor(accessModel: Model<AccessDocument>);
    onModuleInit(): Promise<AccessDocument[] | number>;
    findAllAccess(): Promise<AccessDocument[]>;
    findOneAccessById(id: string): Promise<AccessDocument>;
    findAccessesByNames(param: string[]): Promise<AccessDocument[]>;
    findIdsByNameAccess(accesses: any[]): Promise<AccessDocument[]>;
}
