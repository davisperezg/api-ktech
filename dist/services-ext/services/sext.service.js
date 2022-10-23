"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SExtService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const api_token = 'apis-token-2572.iw9I428FKOuypPuQaf8uFOFopjGp8D6U';
let SExtService = class SExtService {
    async findDocument(document, nroDocument) {
        const params = {
            document: document.toLowerCase().trim(),
            nroDocument: nroDocument.toLowerCase().trim(),
        };
        const { document: documentP, nroDocument: nroDocumentP } = params;
        const { data } = await axios_1.default.get(`https://api.apis.net.pe/v1/${documentP}?numero=${nroDocumentP}`, {
            timeout: 2000,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${api_token}`,
            },
        });
        return data;
    }
};
SExtService = __decorate([
    common_1.Injectable()
], SExtService);
exports.SExtService = SExtService;
//# sourceMappingURL=sext.service.js.map