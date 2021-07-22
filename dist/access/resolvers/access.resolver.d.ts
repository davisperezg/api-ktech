import { AccessService } from '../services/access.service';
export declare class AccessResolver {
    private readonly accessService;
    constructor(accessService: AccessService);
    getAccess(): Promise<import("../schemas/access.schema").AccessDocument[]>;
}
