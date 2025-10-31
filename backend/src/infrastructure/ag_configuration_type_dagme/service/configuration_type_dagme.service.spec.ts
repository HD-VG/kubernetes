/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeDagmeService } from './configuration_type_dagme.service';

describe('ConfigurationTypeDagmeService', () => {
    let service: ConfigurationTypeDagmeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigurationTypeDagmeService],
        }).compile();

        service = module.get<ConfigurationTypeDagmeService>(ConfigurationTypeDagmeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
