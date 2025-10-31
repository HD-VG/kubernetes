/* eslint-disable prettier/prettier */
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AnswerQuery } from 'src/common/interface/answer.interface';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import { AuthService } from 'src/infrastructure/auth/services/auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);

    constructor(
        private reflector: Reflector,
        @Inject(IAuthRepositoryToken)
        private readonly authRepository: IAuthRepository,
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        let requestedRole: string =
            request.decryptedData?.query?.rol ||
            request.query?.rol;
            
        if (!requestedRole || requestedRole.length > 50) {
            // this.logger.error(`[GUARD] Fallo de lectura: El rol solicitado parece ser la cadena encriptada o está vacío: ${requestedRole}`);
            return this.sendErrorResponse(
                context,
                'Role information is missing or corrupted.',
                false,
            );
        }

        requestedRole = requestedRole.toLowerCase().trim();
        // this.logger.log(`[GUARD] Rol solicitado (normalizado): "${requestedRole}"`);

        // --- Validación de Token ---
        if (!authorizationHeader) {
            return this.sendErrorResponse(context, 'Authorization header missing', false);
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return this.sendErrorResponse(context, 'Token missing', false);
        }

        const userId = await this.authService.getIdToken(token);
        // this.logger.log(`[GUARD] JWT Token Decoded. User ID: ${userId}`);

        // --- Obtener Roles de DB ---
        const userRolesResponse = await this.authRepository.findUserById(userId.toString());

        if (!userRolesResponse || !userRolesResponse.data) {
            this.logger.warn(`[GUARD] User roles not found for ID: ${userId}`);
            return this.sendErrorResponse(context, 'User roles not found', false);
        }

        const userAccessList = userRolesResponse.data;
        // this.logger.log(`[GUARD] Roles de usuario disponibles en DB: ${userAccessList.map(u => u.rol).join(', ')}`);

        const method = request.method;

        // --- Chequear Acceso ---
        const hasAccess = this.checkRoleAndPermissions(
            userAccessList,
            requestedRole, // Rol normalizado
            method,
        );

        // this.logger.log(`[GUARD] Resultado del chequeo de acceso: ${hasAccess ? 'ACCESO CONCEDIDO' : 'ACCESO DENEGADO'}`);

        if (!hasAccess) {
            return this.sendErrorResponse(
                context,
                'Access denied for the requested role and permissions',
                false,
            );
        }

        return true;
    }

    checkRoleAndPermissions(
        userAccessList: {
            id: number;
            username: string;
            rol: string;
            permissions: string[];
        }[],
        requestedRole: string,
        method: string,
    ): boolean {

        const userAccess = userAccessList.find(
            (user) => user.rol.toLowerCase().trim() === requestedRole,
        );

        if (!userAccess) {
            this.logger.warn(`[GUARD] Role Match Failed. Requested: "${requestedRole}". Available: ${userAccessList.map(u => u.rol.toLowerCase()).join(', ')}`);
            return false;
        }

        const requiredPermission = this.getPermissionByMethod(method);

        const hasPermission = userAccess.permissions.includes(requiredPermission);

        if (!hasPermission) {
            this.logger.warn(`[GUARD] Permission Match Failed. Required: "${requiredPermission}" for role "${userAccess.rol}". User has: ${userAccess.permissions.join(', ')}`);
        }

        return hasPermission;
    }

    getPermissionByMethod(method: string): string {
        switch (method) {
            case 'POST':
                return 'create';
            case 'GET':
                return 'read';
            case 'PATCH':
                return 'update';
            case 'DELETE':
                return 'delete';
            default:
                return 'read';
        }
    }

    sendErrorResponse(
        context: ExecutionContext,
        message: string,
        status: boolean,
    ): boolean {
        const response = context.switchToHttp().getResponse();
        const answer: AnswerQuery<void> = {
            message,
            error: message,
            status,
            statusCode: 403,
        };

        response.status(403).json(answer);
        return false;
    }
}
