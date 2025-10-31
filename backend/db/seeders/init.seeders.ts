/* eslint-disable prettier/prettier */
import { AppDataSource } from '../../ormconfig';
import { User, Rol, AsignationUserRol, Permission, AsignationRolPermission, ConfigurationTypeWater } from '../../src/domain/shared/index.entity';
import * as bcrypt from 'bcrypt';

async function run() {
  try {
    await AppDataSource.initialize();

    const connection = AppDataSource.manager;
    const setPassword = '123456';

    const permission1 = new Permission();
    permission1.name = "read";
    // permission1.createUserId = 1;
    await connection.save(permission1);
    const permission2 = new Permission();
    permission2.name = "create";
    // permission2.createUserId = 1;
    await connection.save(permission2);
    const permission3 = new Permission();
    permission3.name = "update";
    // permission3.createUserId = 1;
    await connection.save(permission3);
    const permission4 = new Permission();
    permission4.name = "delete";
    // permission4.createUserId = 1;
    await connection.save(permission4);

    // Crear instancias de las entidades
    const user = new User();
    user.name = 'Juan Carlos Vasquez Macias';
    user.username = 'carlos';
    user.email = 'carlosv97m@gmail.com';
    // user.createUserId = 1;
    user.password = await bcrypt.hash(setPassword, 10);

    const user1 = new User();
    user1.name = 'Juan Pablo Raya Romero';
    user1.username = 'pablo';
    user1.email = 'juanpabloraya@gmail.com';
    // user1.createUserId = 1;
    user1.password = await bcrypt.hash(setPassword, 10);

    const user2 = new User();
    user2.name = 'Milton Matias Daza Mamani';
    user2.username = 'matias';
    user2.email = 'matiasdaza@gmail.com';
    // user2.createUserId = 1;
    user2.password = await bcrypt.hash(setPassword, 10);

    const rol = new Rol();
    rol.name = 'administrador';
    // rol.createUserId = 1;

    const rol1 = new Rol();
    rol1.name = 'laboratorio';
    // rol1.createUserId = 1;

    const rol2 = new Rol();
    rol2.name = 'muestras';
    // rol2.createUserId = 1;

    const asignacionUserRol = new AsignationUserRol();
    asignacionUserRol.user = user;
    asignacionUserRol.rol = rol;
    // asignacionUserRol.createUserId = 1;

    const asignacionUserRol1 = new AsignationUserRol();
    asignacionUserRol1.user = user1;
    asignacionUserRol1.rol = rol1;
    // asignacionUserRol1.createUserId = 1;

    const asignacionUserRol2 = new AsignationUserRol();
    asignacionUserRol2.user = user2;
    asignacionUserRol2.rol = rol2;
    // asignacionUserRol2.createUserId = 1;

    const asignacionUserRol3 = new AsignationUserRol();
    asignacionUserRol3.user = user;
    asignacionUserRol3.rol = rol1;
    // asignacionUserRol3.createUserId = 1;

    const asignacionUserRol4 = new AsignationUserRol();
    asignacionUserRol4.user = user;
    asignacionUserRol4.rol = rol2;
    // asignacionUserRol4.createUserId = 1;

    // Para el Admin
    const asignationRolPermission1 = new AsignationRolPermission();
    // asignationRolPermission1.createUserId = 1;
    asignationRolPermission1.rol = rol;
    asignationRolPermission1.permission = permission1
    const asignationRolPermission2 = new AsignationRolPermission();
    // asignationRolPermission2.createUserId = 1;
    asignationRolPermission2.rol = rol;
    asignationRolPermission2.permission = permission2
    const asignationRolPermission3 = new AsignationRolPermission();
    // asignationRolPermission3.createUserId = 1;
    asignationRolPermission3.rol = rol;
    asignationRolPermission3.permission = permission3
    const asignationRolPermission4 = new AsignationRolPermission();
    // asignationRolPermission4.createUserId = 1;
    asignationRolPermission4.rol = rol;
    asignationRolPermission4.permission = permission4
    // Para el Laboratorio
    const asignationRolPermission5 = new AsignationRolPermission();
    // asignationRolPermission5.createUserId = 1;
    asignationRolPermission5.rol = rol1;
    asignationRolPermission5.permission = permission1
    const asignationRolPermission6 = new AsignationRolPermission();
    // asignationRolPermission6.createUserId = 1;
    asignationRolPermission6.rol = rol1;
    asignationRolPermission6.permission = permission2
    const asignationRolPermission7 = new AsignationRolPermission();
    // asignationRolPermission7.createUserId = 1;
    asignationRolPermission7.rol = rol1;
    asignationRolPermission7.permission = permission3
    const asignationRolPermission8 = new AsignationRolPermission();
    // asignationRolPermission8.createUserId = 1;
    asignationRolPermission8.rol = rol1;
    asignationRolPermission8.permission = permission4
    // Para el Muestras
    const asignationRolPermission9 = new AsignationRolPermission();
    // asignationRolPermission9.createUserId = 1;
    asignationRolPermission9.rol = rol2;
    asignationRolPermission9.permission = permission1
    const asignationRolPermission10 = new AsignationRolPermission();
    // asignationRolPermission10.createUserId = 1;
    asignationRolPermission10.rol = rol2;
    asignationRolPermission10.permission = permission2
    const asignationRolPermission11 = new AsignationRolPermission();
    // asignationRolPermission11.createUserId = 1;
    asignationRolPermission11.rol = rol2;
    asignationRolPermission11.permission = permission3
    const asignationRolPermission12 = new AsignationRolPermission();
    // asignationRolPermission12.createUserId = 1;
    asignationRolPermission12.rol = rol2;
    asignationRolPermission12.permission = permission4

    // Guardar los registros en la base de datos
    await connection.save(user);
    await connection.save(user1);
    await connection.save(user2);
    await connection.save(rol);
    await connection.save(rol1);
    await connection.save(rol2);
    await connection.save(asignacionUserRol);
    await connection.save(asignacionUserRol1);
    await connection.save(asignacionUserRol2);
    await connection.save(asignacionUserRol3);
    await connection.save(asignacionUserRol4);
    await connection.save(asignationRolPermission1);
    await connection.save(asignationRolPermission2);
    await connection.save(asignationRolPermission3);
    await connection.save(asignationRolPermission4);
    await connection.save(asignationRolPermission5);
    await connection.save(asignationRolPermission6);
    await connection.save(asignationRolPermission7);
    await connection.save(asignationRolPermission8);
    await connection.save(asignationRolPermission9);
    await connection.save(asignationRolPermission10);
    await connection.save(asignationRolPermission11);
    await connection.save(asignationRolPermission12);

        /* Tipos de agua */
    const type_water1 = new ConfigurationTypeWater();
    const type_water2 = new ConfigurationTypeWater();
    const type_water3 = new ConfigurationTypeWater();
    const type_water4 = new ConfigurationTypeWater();
    type_water1.name = "AGUA POTABLE";
    type_water1.definition = "AGUA_POTABLE";
    type_water1.abbreviation = "AP";
    // type_water1.createUserId = 1;

    type_water2.name = "AGUA CRUDA";
    type_water2.definition = "AGUA_CRUDA";
    type_water2.abbreviation = "AC";
    // type_water2.createUserId = 1;

    type_water3.name = "AGUA RESIDUAL";
    // type_water3.createUserId = 1;
    type_water3.definition = "AGUA_RESIDUAL";
    type_water3.abbreviation = "AR";

    type_water4.name = "LODOS";
    type_water4.definition = "LODOS";
    type_water4.abbreviation = "L";
    // type_water4.createUserId = 1;
    await connection.save(type_water1);
    await connection.save(type_water2);
    await connection.save(type_water3);
    await connection.save(type_water4);

    // console.log('Seed data inserted successfully');
  } catch (error) {
    // console.error('Error inserting seed data:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

run();