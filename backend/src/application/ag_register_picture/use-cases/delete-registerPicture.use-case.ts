/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRegisterPictureToken } from '../tokens/register_picture.tokens';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class DeleteRegisterPictureUseCase {
    constructor(
        @Inject(IRegisterPictureToken)
        private readonly registerPictureRepository: IRegisterPictureRepository,
    ) {}

    async execute(deletePictureId: FindByUuid,userId: FindById) {
        return await this.registerPictureRepository.delete(deletePictureId,userId);
    }
}
