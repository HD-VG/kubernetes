/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  Get,
  Res
} from '@nestjs/common';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateRegisterPictureUseCase,
  ListRegisterPictureByRegisterUseCase,
  DeleteRegisterPictureUseCase,
} from 'src/application/ag_register_picture/use-cases/index.use-case'

import { Response } from 'express';
import { ImageOrPdfPipe } from 'src/common/pipe/FileValidationPipe.pipe';

//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/register-picture')
export class RegisterPictureController {
  constructor(
    private readonly createRegisterPictureUseCase: CreateRegisterPictureUseCase,
    private readonly listregisterPictureByRegisterUseCase: ListRegisterPictureByRegisterUseCase,
    private readonly deleteRegisterPictureUseCase: DeleteRegisterPictureUseCase,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(new ImageOrPdfPipe()) file: Express.Multer.File,
    @Body() createRegisterPictureDto: CreateRegisterPictureDto,
    @Request() req
  ) {
    const user : FindById = { id: req.user.userId };
    return this.createRegisterPictureUseCase.execute(
      createRegisterPictureDto,
      file,
      user,
    );
  }

  //encapsulara todas las imagenes y devolver un zip descargable
  @Get('list_pictures/:id')
  async listFile(
    @Res() res: Response,
    @Param('id') id: string
  ) {
    const viewRegisterId: FindByUuid = {uuid: id};
    return await this.listregisterPictureByRegisterUseCase.execute(res, viewRegisterId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    {
      const deleteId: FindByUuid = {uuid: id};
      const user : FindById = { id: req.user.userId };
      return this.deleteRegisterPictureUseCase.execute(
        deleteId,
        user
      );
    }
  }
}