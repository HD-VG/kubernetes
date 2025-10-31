/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RegisterPicture } from 'src/domain/ag_register_picture/entities/register_picture.entity';
import { Repository,IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';
import { FindById, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import { RegisterPictureService } from '../service/register_picture.service';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class RegisterPictureRepository implements IRegisterPictureRepository {
    constructor(
        @InjectRepository(RegisterPicture)
        private readonly registerPictureRepository: Repository<RegisterPicture>,
        private readonly registerPictureService: RegisterPictureService,//traemos el servicio

    ) { }
    async create(createRegisterPictureDto: CreateRegisterPictureDto,registerPicture : Express.Multer.File, userId: FindById): Promise<AnswerQuery> {
        try {
            const register = await this.registerPictureService.ValidationRegister(createRegisterPictureDto.register_id);
            const configurationAndSave = await this.registerPictureService.configurationSave(createRegisterPictureDto, registerPicture);
            const configuration = RegisterPicture.create(configurationAndSave,register,userId.id)
            const data = await this.registerPictureRepository.save(configuration)
            if (data) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    //para ver todas las imagenes de mi carpeta uploasds que perteenezcan a un register 
    async listPicturesById(viewRegisterPictureId: FindByUuid) {
        try {
            const registerPictures = await this.registerPictureRepository.find({
            relations: ['register'],
            where: { register: { uuid: viewRegisterPictureId.uuid }, deleteAt: IsNull() },
            });
            if (!registerPictures || registerPictures.length === 0) {
            return { status: false, message: 'No se encontraron imágenes para este registro.' };
            }
            const filenames = registerPictures.map(picture => picture.pictureUrl);
            console.log('Archivos encontrados:', filenames);
            
            const zipFile = await this.registerPictureService.GenerateZip(filenames);
            return zipFile;
        } catch (error) {
            return { status: false, message: error.message };
        }
    }
    async delete(deletePictureId: FindByUuid, userId: FindById) {
        try {
            const registerPicture = await this.registerPictureRepository.findOne({
                where: { uuid: deletePictureId.uuid, deleteAt: IsNull() },
                relations: ['register'],
            });
            if (!registerPicture) {
            return {message: "Registro no encontrado",status: false,};
            }
            const transform = registerPicture.delete(userId.id); 
            const result = await this.registerPictureRepository.save(transform);
            this.registerPictureService.deleteFile(registerPicture);
            return { status: true, message: ResponseMessages.RECORD_DELETED, data: result };
        } catch (error) {
            console.error('Error al eliminar el registro:', error.message);
            return { status: false, message: error.message };
        }
    }
}