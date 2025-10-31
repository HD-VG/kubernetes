/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/application/auth/interfaces/jwt-payload.interface';
import * as dotenv from 'dotenv';
import { CheckDto } from 'src/presentation/dtos/auth/index.dto';
dotenv.config();
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }
  public async getIdToken(data: any): Promise<number> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(data, {
      secret: process.env.JWT_SEED,
    });
    if (!payload) {
      throw new BadRequestException('Registro no encontrado');
    }
    return payload.sub;
  }

  async decriptPassword(password: string, dto: CheckDto): Promise<boolean> {
    return await bcrypt.compare(dto.password, password);
  }
}
