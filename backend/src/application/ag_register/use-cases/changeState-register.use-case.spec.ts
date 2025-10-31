/* eslint-disable prettier/prettier */
import { ChangeStateRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('ChangeStateRegisterUseCase', () => {
    let useCase: ChangeStateRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        changeState: jest.fn(),
        } as any;

        useCase = new ChangeStateRegisterUseCase(repository);
    });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.changeState with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro cambiado de estado',
        data: [{
                    id: 1,
                    state: true
                }],
                all: 1,
        };

        (repository.changeState as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid);

        expect(repository.changeState).toHaveBeenCalledWith(FindByUuid);
        expect(result).toEqual(expectedResult);
    });
});