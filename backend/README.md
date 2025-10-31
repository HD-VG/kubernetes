## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- Juan Pablo Raya [CEO] juanpabloraya gitlab user
- Juan Carlos Vasquez [Developer] carlosv97m gitlab user

## Installation

```bash
$ npm install
```

## Configuration
``` bash
## copia el archivo en la raiz del proyecto para los seeders
cp ormconfig.example.ts ormconfig.ts

## copia el archivo dentro de src del proyecto
cp src/ormConfig.example.ts src/ormConfig.ts

## copia el archivo de las variables de entorno
cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test ## execute all tests

## Controller test
$ npm run test -- example.controller ## name of folder-entity

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Seeders
``` bash
# Users data
$ npm run seed
```

## To deploy localy
``` bash
$ docker-compose -f docker-compose.dev.yml up -d --build
## To use Swar Docker
$ docker build -t ambiental-backend:latest .
## To deploy
$ docker stack deploy -c docker-stack.yml ambiental_stack
```

## To deploy on server
```bash
# remenber to clone files .example without .example to see how the project run
# create a ecosystem.config.js and paste 
# module.exports = {
#  apps: [
#    {
#      name: 'nestjs-backend',
#      script: 'dist/main.js', 
#      instances: 'max', 
#      exec_mode: 'cluster',
#      env: {
#        NODE_ENV: 'production'
#      }
#    }
#  ]
#};
# and use
pm2 start ecosystem.config.js
pm2 status
pm2 startup
pm2 save
```

## Structure Project Domain Driven Desing + Hexagonal
```
└── 📁ambiental_elapas_backend
    └── 📁src
        └── 📁application
            └── 📁applicant
                └── 📁dto
                └── 📁tokens
                    ├── applicant.tokens.ts
                └── 📁use-cases
                    ├── create-applicant.use-case.ts
                    ├── delete-applicant.use-case.ts
                    ├── find-by-custody-applicant.use-case.ts
                    ├── find-by-id.use-case.ts
                    ├── index-applicant.use-case.ts
                    ├── list-applicant.use-case.ts
                    ├── update-applicant.use-case.ts
            └── 📁auth
                └── 📁dto
                └── 📁interfaces
                    ├── index.interface.ts
                    ├── jwt-payload.interface.ts
                └── 📁tokens
                    ├── auth-repository.token.ts
                └── 📁use-cases
                    ├── check-tokens.use-case.ts
                    ├── get-user.use-case.ts
                    ├── index.use-case.ts
                    ├── login.use-case.ts
            └── 📁configuration_calculation
                └── 📁tokens
                    ├── configuration_calculation.tokens.ts
                └── 📁use-case
                    ├── create-configuration-calculation.use-case.ts
                    ├── delete-configuration-calculation.use-case.ts
                    ├── find-by-id-configuration-calculation.use-case.ts
                    ├── index-configuration-calculation.use-case.ts
                    ├── list-configuration-calculation.use-case.ts
                    ├── modify-status-apps-configutarion-calculation.use.case.ts
                    ├── modify-status-configuration-calculation.use-case.ts
                    ├── update-configuration-calculation.use.case.ts
            └── 📁configuration_version
                └── 📁dto
                └── 📁tokens
                    ├── configuration_version.tokens.ts
                └── 📁use-cases
                    ├── create-configuration_version.use-case.ts
                    ├── delete-configuration-version.use-case.ts
                    ├── find-by-id-configuration-version.use-case.ts
                    ├── index-configuration-version.use-case.ts
                    ├── list-configuration-version.use-case.ts
                    ├── modify-status-configuration-version.use-case.ts
                    ├── update-configuracion-version.use.case.ts
            └── 📁custody
                └── 📁dto
                    ├── chain-of-custody-pinrt.dto.ts
                    ├── create-chain_of_custody.dto.ts
                    ├── header-info.dto.ts
                    ├── index.dto.ts
                    ├── list_chain_of_custody.dto.ts
                    ├── print_sampling_report.dto.ts
                    ├── update-chain_of_custody.dto.ts
                └── 📁tokens
                    ├── custody-repository.tokens.ts
                └── 📁use-cases
                    ├── create-custody.use-case.ts
                    ├── delete-custody.use-case.ts
                    ├── find-by-id-custody.use-case.ts
                    ├── get-maps-custody.use-case.ts
                    ├── index-custody.use-case.ts
                    ├── list-custody.use-case.ts
                    ├── print-chain-of-custody-pdf.use-case.ts
                    ├── print-chain-of-custody.use-case.ts
                    ├── update-custody.use-case.ts
            └── 📁limit
                └── 📁tokens
                    ├── limit-repository.tokens.ts
                └── 📁use-cases
                    ├── create-limit.use-case.ts
                    ├── delete-limit.use-case.ts
                    ├── find-by-id-limit.use-case.ts
                    ├── index.use-case.ts
                    ├── list-limit.use-case.ts
                    ├── update-limit.use-case.ts
            └── 📁parameter
                └── 📁tokens
                    ├── parameter-repository.tokens.ts
                └── 📁use-cases
                    ├── create-parameter.use-case.ts
                    ├── delete-parameter.use-case.ts
                    ├── find-by-id-parameter.use-case.ts
                    ├── index.use-case.ts
                    ├── list-parameter.use-case.ts
                    ├── update-parameter.use-case.ts
            └── 📁permission
                └── 📁dto
                    ├── create-permission.dto.ts
                    ├── index.dto.ts
                    ├── update-permission.dto.ts
                └── 📁tokens
                    ├── permission-repository.tokens.ts
                └── 📁use-case
                    ├── create-permission.use-case.ts
                    ├── find-all.use-case.ts
                    ├── find-one.use-case.ts
                    ├── index.use-case.ts
                    ├── list.use-case.ts
                    ├── remove-permission.use-case.ts
                    ├── update-permission.use-case.ts
            └── 📁ports
                ├── pdf-generator.interface.ts
            └── 📁report_instance
                └── 📁tokens
                    ├── report-instance-repository.token.ts
                └── 📁use-case
                    ├── create-report-instance.use-case.ts
                    ├── delete-report-instance.use-case.ts
                    ├── find-report-instance.use-case.ts
                    ├── index.use-case.ts
                    ├── list.report-instence.use-case.ts
            └── 📁report_template
                └── 📁tokens
                    ├── report-template-repository.token.ts
                └── 📁use-case
                    ├── create-report-template.use-case.ts
                    ├── delete-report-template.use-case.ts
                    ├── find-by-id-report-template.use-case.ts
                    ├── index-use-case.ts
                    ├── list-report-template.use-case.ts
                    ├── update-report-template.use-case.ts
            └── 📁rol
                └── 📁interface
                    ├── create-rol-permission.interface.ts
                    ├── create-rol.interface.ts
                    ├── index.interface.ts
                    ├── update-rol.interface.ts
                └── 📁tokens
                    ├── rol-repository.tokens.ts
                └── 📁use-case
                    ├── create-rol.use-case.ts
                    ├── find-all-rol.use-case.ts
                    ├── find-one-rol.use.case.ts
                    ├── index.use-case.ts
                    ├── list-rol.use-case.ts
                    ├── remove-multiply-rol.use-case.ts
                    ├── remove-rol.use-case.ts
                    ├── update-rol.use-case.ts
            └── 📁sampling
                └── 📁dto
                └── 📁tokens
                    ├── sampling-repository.tokens.ts
                └── 📁use-cases
                    ├── create-sampling.use-case.ts
                    ├── delete-sampling.use-case.ts
                    ├── find-by-id-salmpling.use-case.ts
                    ├── index.use-case.ts
                    ├── list-sampling.use-case.ts
                    ├── update-laboratory-sampling.use-case.ts
                    ├── update-sampling.use-case.ts
            └── 📁standard
                └── 📁tokens
                    ├── standard-repository.tokens.ts
                └── 📁use-cases
                    ├── create-standard.use-case.ts
                    ├── delete-satandard.use-case.ts
                    ├── find-by-id-standard.use-case.ts
                    ├── index.use-case.ts
                    ├── list-standard.use-case.ts
                    ├── update-standard.use-case.ts
            └── 📁test_result
                └── 📁tokens
                    ├── test-result-repository.tokens.ts
                └── 📁use-case
                    ├── create-test-result.use-case.ts
                    ├── delete-test-result.use-case.ts
                    ├── find-by-id-test-result.use-case.ts
                    ├── index.use-case.ts
                    ├── list-by-custody.use-case.ts
                    ├── list-test-result.use-case.ts
                    ├── update-test-result.use-case.ts
            └── 📁transport
                └── 📁dto
                └── 📁tokens
                    ├── transport-repository.tokens.ts
                └── 📁use-cases
                    ├── create-transport.use-case.ts
                    ├── delete-transport.use-case.ts
                    ├── find-by-custody-id-transport.use-case.ts
                    ├── index-transport.use-case.ts
                    ├── list-transport.use-case.ts
                    ├── update-trasnport.use-case.ts
            └── 📁user
                └── 📁interface
                    ├── asignatio-user-rol.interface.ts
                    ├── create-user.interface.ts
                    ├── index.interface.ts
                    ├── update-user.interface.ts
                └── 📁tokens
                    ├── user-repository.tokens.ts
                └── 📁use-cases
                    ├── create-user.use-case.ts
                    ├── delete-massive-user.use-case.ts
                    ├── delete-user.use-case.ts
                    ├── find-information-user.use-case.ts
                    ├── find-one-user.use-case.ts
                    ├── find-user.use-case.ts
                    ├── index-user.use-case.ts
                    ├── list-pagination-user.use-case.ts
                    ├── list-user.use-case.ts
                    ├── update-user.use-case.ts
        └── 📁assets
            └── 📁fonts
                ├── Roboto-Bold.ttf
                ├── Roboto-BoldItalic.ttf
                ├── Roboto-Italic.ttf
                ├── Roboto-Medium.ttf
                ├── Roboto-Regular.ttf
            └── 📁images
                ├── icono gota.ico.png
                ├── icono gota.png
                ├── logo elapas.png
                ├── logo elapas2.png
                ├── logo login.png
            ├── .gitkeep
        └── 📁common
            └── 📁dto
                ├── answer.dto.ts
                ├── delete_massive.dto.ts
                ├── findById.dto.ts
                ├── findToPrint.dto.ts
                ├── index.dto.ts
                ├── pagination.dto.ts
            └── 📁enum
                ├── answers.enum.ts
            └── 📁filter
                ├── http-exception.filter.ts
                ├── index.filter.ts
                ├── validation-exception.filter.ts
            └── 📁interface
                ├── answer.interface.ts
                ├── graphics.interface.ts
                ├── index.interface.ts
            └── 📁services
                ├── common.service.ts
            └── 📁utils
                ├── date.utils.ts
                ├── index.utils.ts
        └── 📁domain
            └── 📁applicant
                └── 📁entities
                    ├── applicant.entity.ts
                └── 📁interface
                    ├── applicant.interface.ts
                └── 📁value-objects
            └── 📁asignation_rol_permision
                └── 📁entities
                    ├── asignation_rol_permission.entity.ts
            └── 📁asignation_user_rol
                └── 📁entities
                    ├── asignacion_user_rol.entity.ts
            └── 📁auth
                └── 📁interface
                    ├── auth.interface.ts
                └── 📁repositories
                    ├── auth.repository.ts
                └── 📁value-objects
            └── 📁configuration_calculations
                └── 📁entities
                    ├── configuration_calculation.entity.ts
                └── 📁interface
                    ├── configuration_calculation.interface.ts
            └── 📁configuration_version
                └── 📁entites
                    ├── versionConfiguration.entity.ts
                └── 📁interface
                    ├── configuration_version.interface.ts
            └── 📁custody
                └── 📁entities
                    ├── chain_of_custody.entity.ts
                └── 📁interface
                    ├── custody-repository.interface.ts
                └── 📁value-objects
            └── 📁limit
                └── 📁entities
                    ├── limit.entity.ts
                └── 📁interface
                    ├── limit-repository.interface.ts
            └── 📁parameter
                └── 📁entities
                    ├── parameter.entity.ts
                └── 📁interface
                    ├── parameter-repository.interface.ts
            └── 📁permission
                └── 📁entities
                    ├── permission.entity.ts
                └── 📁interface
                    ├── permission.interface.ts
            └── 📁report_instance
                └── 📁entities
                    ├── report_instance.entity.ts
                └── 📁enum
                    ├── testType.ts
                    ├── waterCode.ts
                └── 📁interface
                    ├── report-instance-repository.interface.ts
                └── 📁value_objects
                    ├── reportCode_generator.ts
            └── 📁report_template
                └── 📁entities
                    ├── report_template.entity.ts
                └── 📁interface
                    ├── report-template-repository.interface.ts
                └── 📁value-objects
                    ├── parameter_list.value-objects.ts
            └── 📁rol
                └── 📁entities
                    ├── rol.entity.ts
                └── 📁interface
                    ├── rol.interfac.ts
                └── 📁value-objects
            └── 📁sampling
                └── 📁entities
                    ├── sampling.entity.ts
                └── 📁enum
                    ├── conditions.enum.ts
                    ├── technique.enum.ts
                └── 📁interface
                    ├── sampling-repository.interface.ts
                └── 📁value-objects
            └── 📁shared
                ├── index.entity.ts
                ├── test.json
            └── 📁standard
                └── 📁entities
                    ├── standard.entity.ts
                └── 📁interface
                    ├── standard-repository.interface.ts
            └── 📁test_result
                └── 📁entities
                    ├── test_result.entity.ts
                └── 📁interface
                    ├── test-result-repository.interface.ts
                └── 📁value-objects
                    ├── measurementPair.value-objects.ts
            └── 📁transport
                └── 📁entities
                    ├── transport.entity.ts
                └── 📁interface
                    ├── transport-repository.interface.ts
                └── 📁value-objects
            └── 📁user
                └── 📁entities
                    ├── user.entity.ts
                └── 📁interface
                    ├── user-repository.interface.ts
                └── 📁value-objects
            └── 📁value-objects
                ├── base.value-object.ts
                ├── custody-code.vo.ts
                ├── email.vo.ts
                ├── index.value-object.ts
                ├── index.vo.ts
                ├── initial-conservative.vo.ts
                ├── instrument-code.vo.ts
                ├── password.vo.ts
                ├── sample-code.vo.ts
                ├── sample-condition.vo.ts
                ├── sampling-location.vo.ts
        └── 📁infrastructure
            └── 📁applicant
                └── 📁repositories
                    ├── applicant.repository.ts
                └── 📁services
                    ├── applicant.service.spec.ts
                    ├── applicant.service.ts
            └── 📁auth
                └── 📁guards
                    ├── index.guard.ts
                    ├── jwt-auth.guard.ts
                    ├── jwt-method.guard.ts
                    ├── jwt-strategy.guard.ts
                └── 📁repositories
                    ├── auth.repository.ts
                └── 📁services
                    ├── auth.service.spec.ts
                    ├── auth.service.ts
            └── 📁common
                └── 📁interceptors
                    ├── decrypt.interceptor.ts
                └── 📁middleware
                    ├── decript.middleware.ts
                └── 📁test
            └── 📁configuration_calculations
                └── 📁repositories
                    ├── configuration_calculation.repository.ts
                └── 📁service
                    ├── configuration_calculations.service.spec.ts
                    ├── configuration_calculations.service.ts
            └── 📁configuration_version
                └── 📁repositories
                    ├── configuration_version.repository.ts
                └── 📁services
                    ├── configuration_version.service.spec.ts
                    ├── configuration_version.service.ts
            └── 📁custody
                └── 📁repositories
                    ├── chain_of_custody.repository.ts
                └── 📁services
                    ├── chain_of_custody.service.spec.ts
                    ├── chain_of_custody.service.ts
            └── 📁limit
                └── 📁repositories
                    ├── limit.repository.ts
                └── 📁services
                    ├── limits.service.spec.ts
                    ├── limits.service.ts
            └── 📁parameter
                └── 📁repositories
                    ├── parameter.repository.ts
                └── 📁services
                    ├── parameters.service.spec.ts
                    ├── parameters.service.ts
            └── 📁permission
                └── 📁repositories
                    ├── permissions.repository.ts
                └── 📁services
                    ├── permissions.service.spec.ts
                    ├── permissions.service.ts
            └── 📁report_instance
                └── 📁interface
                    ├── screenshot.interface.ts
                └── 📁repository
                    ├── reposrt_instance.repository.ts
                └── 📁services
                    ├── report_instance.service.spec.ts
                    ├── report_instance.service.ts
            └── 📁report_template
                └── 📁repository
                    ├── report-template.repository.ts
                └── 📁services
                    ├── report_template.service.spec.ts
                    ├── report_template.service.ts
            └── 📁rol
                └── 📁repositories
                    ├── rol.repository.ts
                └── 📁services
                    ├── rol.service.spec.ts
                    ├── rol.service.ts
            └── 📁sampling
                └── 📁repositories
                    ├── sampling.repository.ts
                └── 📁services
                    ├── sampling.service.spec.ts
                    ├── sampling.service.ts
            └── 📁standard
                └── 📁repositories
                    ├── standard.repositoy.ts
                └── 📁services
                    ├── standards.service.spec.ts
                    ├── standards.service.ts
            └── 📁test_result
                └── 📁interface
                    ├── list_test_result.interface.ts
                └── 📁repositories
                    ├── test_result.repository.ts
                └── 📁services
                    ├── test_result.service.spec.ts
                    ├── test_result.service.ts
            └── 📁transport
                └── 📁repositories
                    ├── transport.repository.ts
                └── 📁services
                    ├── transport.service.spec.ts
                    ├── transport.service.ts
            └── 📁user
                └── 📁repositories
                    ├── user.repository.ts
                └── 📁services
                    ├── user.service.spec.ts
                    ├── user.service.ts
        └── 📁modules
            ├── applicant.module.ts
            ├── auth.module.ts
            ├── chain_of_custody.module.ts
            ├── configuration_calculations.module.ts
            ├── configuration_version.module.ts
            ├── limits.module.ts
            ├── parameters.module.ts
            ├── permissions.module.ts
            ├── report_instance.module.ts
            ├── report_template.module.ts
            ├── rol.module.ts
            ├── sampling.module.ts
            ├── standards.module.ts
            ├── test_result.module.ts
            ├── transport.module.ts
            ├── user.module.ts
        └── 📁presentation
            └── 📁controllers
                └── 📁v1
                    └── 📁applicant
                        ├── applicant.controller.spec.ts
                        ├── applicant.controller.ts
                    └── 📁configuration_calculations
                        ├── configuration_calculations.controller.spec.ts
                        ├── configuration_calculations.controller.ts
                    └── 📁configuration_version
                        ├── admin_configuration.controller.spec.ts
                        ├── admin_configuration.controller.ts
                    └── 📁custody
                        ├── chain_of_custody.controller.spec.ts
                        ├── chain_of_custody.controller.ts
                    └── 📁limit
                        ├── limits.controller.spec.ts
                        ├── limits.controller.ts
                    └── 📁parameter
                        ├── parameters.controller.spec.ts
                        ├── parameters.controller.ts
                    └── 📁permission
                        ├── permissions.controller.spec.ts
                        ├── permissions.controller.ts
                    └── 📁report_instance
                        ├── report_instance.controller.spec.ts
                        ├── report_instance.controller.ts
                    └── 📁report_template
                        ├── report_template.controller.spec.ts
                        ├── report_template.controller.ts
                    └── 📁rol
                        ├── rol.controller.spec.ts
                        ├── rol.controller.ts
                    └── 📁sampling
                        ├── sampling.controller.spec.ts
                        ├── sampling.controller.ts
                    └── 📁standard
                        ├── standards.controller.spec.ts
                        ├── standards.controller.ts
                    └── 📁test_result
                        ├── test_result.controller.spec.ts
                        ├── test_result.controller.ts
                    └── 📁transport
                        ├── transport.controller.spec.ts
                        ├── transport.controller.ts
                    └── 📁user
                        ├── user.controller.spec.ts
                        ├── user.controller.ts
                ├── auth.controller.ts
            └── 📁dtos
                └── 📁applicant
                    ├── create-applicant.dto.ts
                    ├── index.dto.ts
                    ├── update-applicant.dto.ts
                └── 📁auth
                    ├── check.dto.ts
                    ├── create-user.dto.ts
                    ├── index.dto.ts
                    ├── update-user.dto.ts
                    ├── user_access.dto.ts
                └── 📁configuration_calculations
                    ├── create-configuration_calculation.dto.ts
                    ├── index.dto.ts
                    ├── update-configuration_calculation.dto.ts
                └── 📁configuration_version
                    ├── create-admin_configuration.dto.ts
                    ├── index.dto.ts
                    ├── update-admin_configuration.dto.ts
                └── 📁custody
                    ├── chain-of-custody-pinrt.dto.ts
                    ├── create-chain_of_custody.dto.ts
                    ├── header-info.dto.ts
                    ├── index.dto.ts
                    ├── list_chain_of_custody.dto.ts
                    ├── print_sampling_report.dto.ts
                    ├── update-chain_of_custody.dto.ts
                └── 📁limit
                    ├── create-limit.dto.ts
                    ├── index-limit.dto.ts
                    ├── update-limit.dto.ts
                └── 📁parameter
                    ├── create-parameter.dto.ts
                    ├── index-parameter.dto.ts
                    ├── update-parameter.dto.ts
                └── 📁permission
                    ├── create-permission.dto.ts
                    ├── index.dto.ts
                    ├── update-permission.dto.ts
                └── 📁report_instance
                    ├── create-report_instance.dto.ts
                    ├── index.dto.ts
                    ├── update-report_instance.dto.ts
                └── 📁report_template
                    ├── create-report_template.dto.ts
                    ├── index.dto.ts
                    ├── update-report_template.dto.ts
                └── 📁rol
                    ├── create-rol.dto.ts
                    ├── index.dto.ts
                    ├── update-rol.dto.ts
                └── 📁sampling
                    ├── create-sampling.dto.ts
                    ├── index.dto.ts
                    ├── update-sampling-laboratory.dto.ts
                    ├── update-sampling.dto.ts
                └── 📁standard
                    ├── create-standard.dto.ts
                    ├── index-standard.dto.ts
                    ├── update-standard.dto.ts
                └── 📁test_result
                    ├── create-test_result.dto.ts
                    ├── index.dto.ts
                    ├── list-by-custody-sampling.dto.ts
                    ├── update-test_result.dto.ts
                └── 📁transport
                    ├── create-transport.dto.ts
                    ├── index.dto.ts
                    ├── update-transport.dto.ts
                └── 📁user
                    ├── create-user.dto.ts
                    ├── index.dto.ts
                    ├── update-user.dto.ts
        ├── app.controller.spec.ts
        ├── app.controller.ts
        ├── app.module.ts
        ├── app.service.ts
        ├── main.ts
        ├── ormConfig.example.ts
        ├── ormConfig.ts
    └── 📁test
        ├── app.e2e-spec.ts
        ├── jest-e2e.json
    ├── .env
    ├── .env.example
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── compose.yaml
    ├── Dockerfile
    ├── ecosystem.config.js
    ├── nest-cli.json
    ├── ormconfig.example.ts
    ├── ormconfig.ts
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.build.json
    └── tsconfig.json
```

## Guide to production mode
``` bash
## On ubuntu server 24.04
$ sudo nano /etc/netplan/50-cloud-init.yaml
## Paste
network:
  version: 2
  ethernets:
    ens18:
      addresses:
        - 192.168.16.34/24
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
      routes:
        - to: 0.0.0.0/0
          via: 192.168.16.1
$ sudo netplan generate
$ sudo netplan apply

## Create a folder
$ mkdir -p ~/.n
# Put
$ export N_PREFIX="$HOME/.n"
$ export PATH="$N_PREFIX/bin:$PATH"
## By guide on ubuntu repository
$ echo 'export N_PREFIX="$HOME/.n"' >> ~/.bashrc
$ echo 'export PATH="$N_PREFIX/bin:$PATH"' >> ~/.bashrc
$ source ~/.bashrc
## Install node
$ curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s lts
## If you want to use node like a usper User
$ sudo mkdir -p /usr/local/n
$ sudo chown -R $(whoami) /usr/local/n
$ sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
$ curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s lts

## PostgrSQL Install
$ sudo apt install curl ca-certificates gnupg -y
$ sudo install -d /usr/share/postgresql-common/pgdg
$ curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc
$ echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
$ sudo apt update
$ sudo apt install -y postgresql postgresql-contrib
## You need to see if the services run
$ sudo systemctl status postgresql
$ ALTER USER postgres PASSWORD 'TuContraseñaSegura';
$ \q
$ sudo nano /etc/postgresql/*/main/postgresql.conf
$ listen_addresses = '*' ## To conections on global mode
$ sudo nano /etc/postgresql/*/main/pg_hba.conf
## Change peer to md5
## # "local" is for Unix domain socket connections only
## local   all             all                                     peer
## host    all             all             127.0.0.1/32            peer
## TO
## local   all             all                                     md5
## host    all             all             127.0.0.1/32            md5
## host    all             all             ::1/128                 md5
$ sudo systemctl restart postgresql
## Them change your password
$ sudo -u postgres psql
$ ALTER USER postgres WITH PASSWORD 'tu_contraseña';
$ \q
$ sudo -u postgres psql -c "CREATE DATABASE db_ambiental;"
$ sudo -u postgres psql -c "ALTER DATABASE db_ambiental OWNER TO postgres;"
```

## Install PM2 to run the project in a seccond instance
``` bash
$ npm install -g pm2
$ pm2 start ecosystem.config.js
$ pm2 list
$ pm2 logs nestjs-backend
$ pm2 save
$ pm2 startup
```

## If you want to edit on server
``` bash
$ sudo chown -R elapas:elapas /home/elapas/control_calidad/backend
$ npm run build
$ ls dist/main.js
$ sudo chown -R elapas:elapas /home/elapas/control_calidad/frontend
```