/* eslint-disable prettier/prettier */
import { DeleteRegisterPictureUseCase } from './index.use-case';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';

describe('DeleteRegisterPictureUseCase', () => {
    let useCase: DeleteRegisterPictureUseCase;
    let repository: IRegisterPictureRepository;

    beforeEach(() => {
        repository = {
        delete: jest.fn(),
        } as any;

        useCase = new DeleteRegisterPictureUseCase(repository);
    });
    const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    const user: FindById = { id:1 };
    it('should call repository.delete with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro Imagen eliminado',
        data: [{
                    id: 1,
                    name: 'RegisterPicture',
                    basicCoste: 123
                }],
                all: 1,
        };

        (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid, user);

        expect(repository.delete).toHaveBeenCalledWith(FindByUuid, user);
        expect(result).toEqual(expectedResult);
    });
});