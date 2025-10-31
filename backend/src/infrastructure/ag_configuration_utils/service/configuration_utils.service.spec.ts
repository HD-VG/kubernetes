/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationUtilService } from './configuration_utils.service';

describe('ConfigurationUtilService', () => {
    let service: ConfigurationUtilService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigurationUtilService],
        }).compile();

        service = module.get<ConfigurationUtilService>(ConfigurationUtilService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
