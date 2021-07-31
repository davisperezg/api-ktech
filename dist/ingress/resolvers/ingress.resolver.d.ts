import { IngressService } from '../services/ingress.service';
import { CreateIngressInput } from '../dto/inputs/create-ingress.input';
import { UpdateIngressInput } from '../dto/inputs/update-ingress.input';
import { IngressDocument } from '../schemas/ingress.schema';
export declare class IngressResolver {
    private readonly ingressService;
    constructor(ingressService: IngressService);
    registerIngress(ingressInput: CreateIngressInput): Promise<IngressDocument>;
    updateIngress(ingressInput: UpdateIngressInput): Promise<IngressDocument>;
    deleteIngress(id: string): Promise<boolean>;
    getIngress(): Promise<IngressDocument[]>;
    getIngressByDates(start: string, end: string): Promise<IngressDocument[]>;
}
