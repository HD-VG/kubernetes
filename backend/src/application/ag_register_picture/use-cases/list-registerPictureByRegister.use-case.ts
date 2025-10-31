/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IRegisterPictureToken } from '../tokens/register_picture.tokens';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { Response } from 'express';

@Injectable()
export class ListRegisterPictureByRegisterUseCase {
    constructor(
        @Inject(IRegisterPictureToken)
        private readonly registerPictureRepository: IRegisterPictureRepository,
    ) { }

    async execute(res: Response, viewPictureRegisterId: FindByUuid) {
        const dataBuffer = await this.registerPictureRepository.listPicturesById(viewPictureRegisterId);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="register_files_All.zip"`);
        res.send(dataBuffer);
    }
}
