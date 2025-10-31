/* eslint-disable prettier/prettier */
import { 
  MiddlewareConsumer,
  Module, 
  RequestMethod 
} from '@nestjs/common';
import { DecryptBodyMiddleware } from './infrastructure/common/middleware/decript.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth.module';
import { UserModule } from 'src/modules/auth_user.module';
import { RolModule } from './modules/auth_rol.module';
import { PermissionsModule } from './modules/auth_permissions.module';
import { ChainOfCustodyModule } from './modules/cc_chain_of_custody.module';
import { SamplingModule } from './modules/cc_sampling.module';
import { TransportModule } from './modules/cc_transport.module';
import { ApplicantModule } from './modules/cc_applicant.module';
import { ConfigurationVersionModule } from './modules/cc_configuration_version.module';
import { ConfigurationCalculationsModule } from './modules/cc_configuration_calculations.module';
import { TestResultModule } from './modules/cc_test_result.module';
import { ReportTemplateModule } from './modules/cc_report_template.module';
import { ReportInstanceModule } from './modules/cc_report_instance.module';
import { StandardsModule } from './modules/cc_configuration_standards.module';
import { ParametersModule } from './modules/cc_configuration_parameters.module';
import { LimitsModule } from './modules/cc_configuration_limits.module';
import { ConfigurationUexpModule } from './modules/cc_configuration_uexp.module';
import { ConfigurationTypeWaterModule } from './modules/cc_configuration_type_water.module';

import { dbdatasource } from './ormConfig';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigurationTypeDagmeModule } from './modules/ag_configuration_type_dagme.module';
import { ConfigurationTypeMachineModule } from './modules/ag_configuration_type_machine.module';
import { ConfigurationTypeWorkModule } from './modules/ag_configuration_type_work.module';
import { ConfigurationUtilsModule } from './modules/ag_configuration_utils.module';
import { ConfigurationCarsModule } from './modules/ag_configuration_cars.module';
import { ConfigurationTypeMaterialModule } from './modules/ag_configuration_type_material.module';
import { WaterModule } from './modules/ag_water.module';
import { ReportedModule } from './modules/ag_reported.module';
import { ReporterModule } from './modules/ag_reporter.module';
import { RegisterModule } from './modules/ag_register.module';
import { RecurringModule } from 'src/modules/ag_recurring.module';
import { RegisterPictureModule } from './modules/ag_register_picture.module';

import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    AuthModule,
    UserModule,
    RolModule,
    PermissionsModule,
    ChainOfCustodyModule,
    SamplingModule,
    TransportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/assets'),
      serveRoot: '/assets/',
    }),
    ConfigurationVersionModule,
    ApplicantModule,
    ConfigurationCalculationsModule,
    TestResultModule,
    ReportInstanceModule,
    ReportTemplateModule,
    StandardsModule,
    ParametersModule,
    LimitsModule,
    ConfigurationTypeDagmeModule,
    ConfigurationTypeMachineModule,
    ConfigurationTypeWorkModule,
    ConfigurationUtilsModule,
    ConfigurationCarsModule,
    ConfigurationTypeMaterialModule,
    WaterModule,
    ReportedModule,
    ReporterModule,
    RegisterModule,
    RecurringModule,
    RegisterPictureModule,
    ConfigurationUexpModule,
    ConfigurationTypeWaterModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined, // Usa pino-pretty solo en entornos que no sean de producción
        timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,// Opcional: Configuración adicional, por ejemplo, para el timestamp
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptBodyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // aplica globalmente
  }

}
// export class AppModule {}