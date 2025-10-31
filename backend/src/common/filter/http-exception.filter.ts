/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class UnifiedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let customResponse;

    if (exception instanceof BadRequestException) {
      const exceptionResponse: any = exception.getResponse();
      const message = exceptionResponse.message || 'Bad Request';
      status = exception.getStatus();

      customResponse = {
        message: Array.isArray(message) ? message : [message],
        error: exceptionResponse.error || 'Validation Error',
        data: null,
        status: false,
        statusCode: status,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const message = exception.message || 'HTTP Error';

      customResponse = {
        message: Array.isArray(message) ? message : [message],
        error: exception.name || 'HTTP Exception',
        status: false,
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = exception.message || 'Internal Server Error';

      customResponse = {
        message: Array.isArray(message) ? message : [message],
        error: exception.name || 'Internal Error',
        status: false,
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    }

    response.status(status).json(customResponse);
  }
}
