import { Injectable } from '@nestjs/common';
import axios from 'axios';

const api_token = 'apis-token-2572.iw9I428FKOuypPuQaf8uFOFopjGp8D6U';

@Injectable()
export class SExtService {
  async findDocument(document: string, nroDocument: string) {
    const params = {
      document: document.toLowerCase().trim(),
      nroDocument: nroDocument.toLowerCase().trim(),
    };

    const { document: documentP, nroDocument: nroDocumentP } = params;

    const { data } = await axios.get(
      `https://api.apis.net.pe/v1/${documentP}?numero=${nroDocumentP}`,
      {
        timeout: 2000,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${api_token}`,
        },
      },
    );

    return data;
  }
}
