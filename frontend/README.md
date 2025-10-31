# Elapas Ambiental APP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.
By  [Elapas Systems](https://www.elapas.com.bo/) without domain.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

Develop by ELAPAS System departament, contac us: [email](carlosv97m@gmail.com)

## Structure
```
└── 📁frontend_ambiental
    └── 📁.angular
    └── 📁src
        └── 📁app
            └── 📁layout
                └── 📁api
                    └── answerQuery.interface.ts
                    └── menuchangeevent.ts
                    └── rol.interface.ts
                └── 📁auth
                    └── 📁access
                        └── access-routing.module.ts
                        └── access.component.html
                        └── access.component.ts
                        └── access.module.ts
                    └── 📁error
                        └── error-routing.module.ts
                        └── error.component.html
                        └── error.component.ts
                        └── error.module.ts
                    └── 📁login
                        └── 📁interface
                            └── auth-status.enum.ts
                            └── index.interface.ts
                            └── loginresponse.interface.ts
                        └── login-routing.module.ts
                        └── login.component.html
                        └── login.component.ts
                        └── login.module.ts
                    └── 📁service
                        └── auth.service.ts
                    └── auth-routing.module.ts
                    └── auth.module.ts
                └── 📁common
                    └── 📁service
                        └── common.service.ts
                └── 📁components
                    └── 📁dashboard
                        └── dashboard-routing.module.ts
                        └── dashboard.component.html
                        └── dashboard.component.ts
                        └── dashboard.module.ts
                    └── 📁users
                        └── 📁rol
                            └── 📁rol-create
                            └── 📁rol-edit
                            └── 📁rol-list
                                └── rol-list.module.ts
                                └── rol.component.html
                                └── rol.component.scss
                                └── rol.component.spec.ts
                                └── rol.component.ts
                            └── rol-routing.module.ts
                            └── rol.module.ts
                        └── 📁service
                            └── user.service.ts
                        └── 📁user
                            └── user-routing.module.ts
                            └── user.component.html
                            └── user.component.scss
                            └── user.component.spec.ts
                            └── user.component.ts
                            └── user.module.ts
                        └── users-routing.module.ts
                        └── users.module.ts
                └── 📁config
                    └── app.config.component.html
                    └── app.config.component.ts
                    └── config.module.ts
                └── 📁service
                    └── app.layout.service.ts
                └── app.footer.component.html
                └── app.footer.component.ts
                └── app.layout.component.html
                └── app.layout.component.ts
                └── app.layout.module.ts
                └── app.menu.component.html
                └── app.menu.component.ts
                └── app.menu.service.ts
                └── app.menuitem.component.ts
                └── app.sidebar.component.html
                └── app.sidebar.component.ts
                └── app.topbar.component.html
                └── app.topbar.component.ts
            └── app-routing.module.ts
            └── app.component.html
            └── app.component.ts
            └── app.module.ts
        └── 📁environments
            └── environment.prod.ts
            └── environment.ts
        └── favicon.ico
        └── index.html
        └── main.ts
        └── styles.scss
        └── test.ts
    └── .editorconfig
    └── .env
    └── .eslintrc.json
    └── .gitignore
    └── angular.json
    └── CHANGELOG.md
    └── LICENSE.md
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json
```
