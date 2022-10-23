import { Controller, Get, Param } from '@nestjs/common';
import { SExtService } from '../services/sext.service';

@Controller('api/v1/identify')
export class SextController {
  constructor(private readonly sextService: SExtService) {}

  @Get('/:document/:nro')
  async getInfo(
    @Param('document') document: string,
    @Param('nro') nroDocument: string,
  ) {
    return await this.sextService.findDocument(document, nroDocument);
  }
}
