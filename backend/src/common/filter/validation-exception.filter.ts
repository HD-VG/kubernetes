/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const message = exceptionResponse.message || 'Bad Request';

    const customResponse = {
      message,
      error: exceptionResponse.error || 'Bad Request',
      data: null,
      status: false,
      statusCode: status,
    };

    response.status(status).json(customResponse);
  }
}
