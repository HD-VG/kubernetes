/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTransportDto, UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateTransportUseCase,
  DeleteTransportUseCase,
  FindTransportUseCase,
  ListTransportUseCase,
  UpdateTransportUseCase
} from 'src/application/cc_transport/use-cases/index-transport.use-case';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/transport')
export class TransportController {
  constructor(
    private readonly createTransportUseCase: CreateTransportUseCase,
    private readonly deleteTransportUseCase: DeleteTransportUseCase,
    private readonly findTransportUseCase: FindTransportUseCase,
    private readonly listTransportUseCase: ListTransportUseCase,
    private readonly updateTransportUseCase: UpdateTransportUseCase,
  ) { }

  @Post()
  create(
    @Body() createTransportDto: CreateTransportDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.createTransportUseCase.execute(createTransportDto, userId);
  }

  @Get('list')
  findAll(@Query() findById: FindById) {
    return this.listTransportUseCase.execute(findById);
  }

  @Get('findById')
  findOne(@Query() findById: FindById) {
    return this.findTransportUseCase.execute(findById.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransportDto: UpdateTransportDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updateTransportUseCase.execute(+id, updateTransportDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query() findById: FindById,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.deleteTransportUseCase.execute(findById, userId);
  }
}
