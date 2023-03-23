import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import * as StubData from './../stub/stubData.json';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('userclaims', () => {
    it('should return Array of objects', () => {
      jest
        .spyOn(appService, 'getUserClaims')
        .mockImplementation(() => StubData.claimStatusList);
      expect(appController.getUserClaims({ userId: 23232 })).toBe(
        StubData.claimStatusList,
      );
    });
  });

  describe('claimdocuments', () => {
    it('should return Array of objects', () => {
      jest
        .spyOn(appService, 'getClaimDocuments')
        .mockImplementation(() => StubData.documentList);
      expect(appController.getClaimDocuments({ claimNumber: 123312 })).toBe(
        StubData.documentList,
      );
    });
  });
});
