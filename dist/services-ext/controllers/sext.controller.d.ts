import { SExtService } from '../services/sext.service';
export declare class SextController {
    private readonly sextService;
    constructor(sextService: SExtService);
    getInfo(document: string, nroDocument: string): Promise<any>;
}
