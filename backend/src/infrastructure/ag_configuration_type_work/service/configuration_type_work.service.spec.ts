/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeWorkService } from './configuration_type_work.service';

describe('ConfigurationTypeWorkService', () => {
    let service: ConfigurationTypeWorkService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigurationTypeWorkService],
        }).compile();

        service = module.get<ConfigurationTypeWorkService>(ConfigurationTypeWorkService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
