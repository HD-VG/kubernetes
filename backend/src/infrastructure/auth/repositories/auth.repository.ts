/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckDto, UserAccessResponse } from 'src/presentation/dtos/auth/index.dto';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { User } from 'src/domain/auth_user/entities/user.entity';
import { FindById } from 'src/common/dto/findById.dto';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        private jwtService: JwtService,
        private readonly authService: AuthService,

        @InjectRepository(AsignationUserRol)
        private readonly asignationUserRolRepository: Repository<AsignationUserRol>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) { }

    async validateUserCredentials(checkDto: CheckDto): Promise<User | null> {
        try {
            const data = await this.userRepository.findOne({ where: { username: checkDto.username } });
            if (!data) { return null; }
            const password = await this.authService.decriptPassword(data.password, checkDto);
            if (!data || !password) { return data }
            return data

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
    async singPayload(user: User, access: UserAccessResponse) {
        const payload = { username: user.username, sub: user.id };
        return {
            id: user.id,
            token: this.jwtService.sign(payload),
            user: user.username,
            access: access.userAccessList.map(role => ({
                rol: role.rol,
                permissions: role.permissions
            }))
        };
    }
    async getIdToken(data: any): Promise<number> {
        return await this.authService.getIdToken(data);
    }
    async findUser(findById: FindById) {
        try {
            const data = await this.userRepository.findOneBy({ id: findById.id });
            if (data) {
                return data
            }
        } catch (error) {
            throw new BadRequestException('Error en el registro');
        }
    }
    async findUserById(id: string): Promise<AnswerQuery | null> {
        try {
            const data = await this.asignationUserRolRepository.createQueryBuilder("asignationUserRol")
                .innerJoinAndSelect("asignationUserRol.user", "user")
                .innerJoinAndSelect("asignationUserRol.rol", "rol")
                .innerJoinAndSelect('rol.asignationRolPermission', 'asignationRolPermission')
                .innerJoinAndSelect('asignationRolPermission.permission', 'permission')
                .where("user.id = :id", { id })
                .andWhere("asignationUserRol.deleteAt IS NULL")
                .getMany();
            if (!data) { throw new BadRequestException("No encontrado") }
            const userRolesWithPermissions = data.map(asignationUserRol => {
                const role = asignationUserRol.rol;
                const user = asignationUserRol.user;
                const permissions = role.asignationRolPermission.map(asignationRolPermission => {
                    return asignationRolPermission.permission.name;
                });
                return {
                    id: user.id,
                    username: user.username,
                    rol: role.name,
                    permissions: permissions
                };
            });
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: userRolesWithPermissions };
        } catch (error) {
            throw new BadRequestException('Error en el registro');
        }
    }
    async findUserRoles(checkDto: CheckDto): Promise<UserAccessResponse | null> {
        try {
            const { username } = checkDto
            const data = await this.asignationUserRolRepository.createQueryBuilder("asignationUserRol")
                .innerJoinAndSelect("asignationUserRol.user", "user")
                .innerJoinAndSelect("asignationUserRol.rol", "rol")
                .innerJoinAndSelect('rol.asignationRolPermission', 'asignationRolPermission')
                .innerJoinAndSelect('asignationRolPermission.permission', 'permission')
                .where("user.username = :username", { username })
                .andWhere("asignationUserRol.deleteAt IS NULL")
                .getMany();
            if (!data) { throw new BadRequestException("No encontrado") }
            const userRolesWithPermissions = data.map(asignationUserRol => {
                const role = asignationUserRol.rol;
                const user = asignationUserRol.user;
                const permissions = role.asignationRolPermission.map(asignationRolPermission => {
                    return asignationRolPermission.permission.name;
                });
                return {
                    username: user.username,
                    rol: role.name,
                    permissions: permissions
                };
            });
            return { userAccessList: userRolesWithPermissions };
        } catch (error) {
            throw new BadRequestException('Error en el registro');
        }
    }
}