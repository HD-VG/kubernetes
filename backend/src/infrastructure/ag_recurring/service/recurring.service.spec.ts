/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RecurringService } from './recurring.service';
import { RecurringRepository } from '../repository/recurring.repository';
import { Recurring } from 'src/domain/ag_recurring/entities/recurring.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
describe('RecurringService', () => {
  let service: RecurringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurringService,
        RecurringRepository,
        {
          provide: getRepositoryToken(Recurring),
          useClass: Repository}
      ],
    }).compile();

    service = module.get<RecurringService>(RecurringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
