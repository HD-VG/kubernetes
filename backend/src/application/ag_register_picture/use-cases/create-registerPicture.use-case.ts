/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';
import { IRegisterPictureToken } from '../tokens/register_picture.tokens';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class CreateRegisterPictureUseCase {
  constructor(
    @Inject(IRegisterPictureToken)
    private readonly RegisterPictureRepository: IRegisterPictureRepository,
  ) {}

  async execute(createPictureDto: CreateRegisterPictureDto,registerPicture : Express.Multer.File, userId: FindById) {
    return this.RegisterPictureRepository.create(createPictureDto,registerPicture, userId);
  }
}
