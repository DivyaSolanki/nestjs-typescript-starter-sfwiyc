import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import * as StubData from './../stub/stubData.json';

describe('AppController', () => {
  let app: INestApplication;
  let appService = {
    getUserClaims: () => StubData.claimStatusList,
    getClaimDocuments: () => StubData.documentList,
  };

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = testingModule.createNestApplication({
      bodyParser: true,
      rawBody: true,
    });
    await app.init();
    app.listen(8080);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('userclaims', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/userclaims?userId=2332323')
        .set({ Authorization: 'Bearer eyJhbGc' })
        .expect(200)
        .expect(appService.getUserClaims());
    });

    it('should return 403 in case of header token mising', () => {
      return request(app.getHttpServer())
        .get('/userclaims?userId=2332323')
        .expect(403);
    });

    it('should return 400 incase of missing query input', () => {
      return request(app.getHttpServer())
        .get('/userclaims')
        .set({ Authorization: 'Bearer eyJhbGc' })
        .expect(400);
    });
  });

  describe('claimdocuments', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/claimdocuments?claimNumber=2323123')
        .set({ Authorization: 'Bearer eyJhbGc' })
        .expect(200)
        .expect(appService.getClaimDocuments());
    });

    it('should return 403 in case of header token mising', () => {
      return request(app.getHttpServer())
        .get('/claimdocuments?claimNumber=2323123')
        .expect(403);
    });

    it('should return 400 incase of missing query input', () => {
      return request(app.getHttpServer())
        .get('/claimdocuments')
        .set({ Authorization: 'Bearer eyJhbGc' })
        .expect(400);
    });
  });
});
