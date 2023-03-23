import { Injectable } from '@nestjs/common';
import * as StubData from './../stub/stubData.json';

@Injectable()
export class AppService {
  getUserClaims(): Array<Object> {
    return StubData.claimStatusList;
  }

  getClaimDocuments(): Array<Object> {
    return StubData.documentList;
  }
}
