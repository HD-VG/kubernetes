/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReportedService } from './reported.service';
describe('ReportedService', () => {
  let service: ReportedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportedService],
    }).compile();

    service = module.get<ReportedService>(ReportedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
