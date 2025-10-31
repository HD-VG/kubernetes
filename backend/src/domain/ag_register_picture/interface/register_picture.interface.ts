/* eslint-disable prettier/prettier */
import { AnswerQuery, FindById, FindByUuid } from 'src/common/dto/index.dto';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';

export interface IRegisterPictureRepository {
    create(createRegisterPictureDto: CreateRegisterPictureDto,registerPicture : Express.Multer.File, userId: FindById): Promise<AnswerQuery>
    listPicturesById(viewPictureId: FindByUuid)
    delete(deletePictureId: FindByUuid,userId: FindById)
}