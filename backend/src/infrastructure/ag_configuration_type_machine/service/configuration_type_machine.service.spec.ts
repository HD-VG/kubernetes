/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeMachineService } from './configuration_type_machine.service';

describe('ConfigurationTypeMachineService', () => {
    let service: ConfigurationTypeMachineService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigurationTypeMachineService],
        }).compile();

        service = module.get<ConfigurationTypeMachineService>(ConfigurationTypeMachineService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
