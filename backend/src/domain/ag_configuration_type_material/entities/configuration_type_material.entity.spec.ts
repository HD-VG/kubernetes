/* eslint-disable prettier/prettier */
import { ConfigurationTypeMaterial } from './configuration_type_material.entity';
import { CreateConfigurationTypeMaterialDto, UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';

describe('ConfigurationTypeMaterial Entity', () => {
  const userId = 1;
  const mockRegister = {
    id: 1,
    reason: 'test reason',
    addressDagme: 'test address',
    timeStart: new Date(),
    timeWater: new Date(),
    perforation: 'test perf',
    code: 'testCode',
    cite: 'test cite',
    timeInit: new Date(),
    timeEnd: new Date(),
    drillHole: 'test drill',
  } as any;

  const sampleDto: CreateConfigurationTypeMaterialDto = {
    codigo: 'testCode',
    padre: 'test_parent',
    nivel: 1,
    ramas: 2,
    nombre: 'test name',
    unidad: 'kg',
    valMinimo: 10.5,
    valMaximo: 100.12345678,
    precioUs: 50.75,
    PrecioBs: 200.98765432,
    tipoItem: 'item_type',
    iAlmacen: 'stock_loc',
    cantidadD: 5,
    cantidadH: 10,
    saldoCantidad: 15,
    debeBs: 100.5,
    HaberBs: 50.25,
    SaldoCosto: 75.12345678,
    unit: 'requested_unit',
    quantity: 20,
  } as any;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = {
        code: 'partial_code',
        name: 'partial_name',
        valMinimun: 5.5,
        register: mockRegister,
      };
      const entity = new ConfigurationTypeMaterial(data);
      expect(entity.code).toBe('partial_code');
      expect(entity.name).toBe('partial_name');
      expect(entity.valMinimun).toBe(5.5);
      expect(entity.register).toBe(mockRegister);
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new ConfigurationTypeMaterial();
      expect(entity.code).toBeUndefined();
      expect(entity.name).toBeUndefined();
      expect(entity.valMinimun).toBeUndefined();
      expect(entity.register).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const entity = ConfigurationTypeMaterial.create(sampleDto, mockRegister, userId);

      expect(entity).toBeInstanceOf(ConfigurationTypeMaterial);
      expect(entity.code).toBe('TESTCODE');
      expect(entity.parent).toBe('TEST_PARENT');
      expect(entity.level).toBe(1);
      expect(entity.branches).toBe(2);
      expect(entity.name).toBe('TEST NAME');
      expect(entity.unit).toBe('KG');
      expect(entity.valMinimun).toBe(10.5);
      expect(entity.valMaximun).toBe(100.12345678);
      expect(entity.priceUs).toBe(50.75);
      expect(entity.priceBs).toBe(200.98765432);
      expect(entity.typeItem).toBe('ITEM_TYPE');
      expect(entity.iStock).toBe('STOCK_LOC');
      expect(entity.quantityD).toBe(5);
      expect(entity.quantityH).toBe(10);
      expect(entity.balandeAmount).toBe(15);
      expect(entity.debitBs).toBe(100.5);
      expect(entity.creditBs).toBe(50.25);
      expect(entity.balanceCost).toBe(75.12345678);
      expect(entity.unitRequested).toBe('requested_unit');
      expect(entity.totalCost).toBe(75.12345678);
      expect(entity.quantity).toBe(20);
      expect(entity.register).toBe(mockRegister);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con DTO completo', () => {
      const entity = new ConfigurationTypeMaterial({
        id: 1,
        code: 'OLD_CODE',
        parent: 'OLD_PARENT',
        name: 'OLD_NAME',
        unit: 'old_unit',
        valMinimun: 1.0,
        priceUs: 10.0,
        typeItem: 'old_type',
        quantityD: 1,
        balandeAmount: 1,
        debitBs: 10.0,
        creditBs: 5.0,
        balanceCost: 7.5,
        unitRequested: 'old_req',
        totalCost: 7.5,
        quantity: 1,
        register: mockRegister,
      });

      const updateDto: UpdateConfigurationTypeMaterialDto = {
        codigo: 'NEW_CODE',
        padre: 'NEW_PARENT',
        nivel: 3,
        ramas: 4,
        nombre: 'NEW_NAME',
        unidad: 'NEW_UNIT',
        valMinimo: 20.5,
        valMaximo: 200.87654321,
        precioUs: 100.25,
        PrecioBs: 400.12345678,
        tipoItem: 'NEW_TYPE',
        iAlmacen: 'NEW_STOCK',
        cantidadD: 15,
        cantidadH: 25,
        saldoCantidad: 40,
        debeBs: 200.75,
        HaberBs: 100.125,
        SaldoCosto: 150.98765432,
        unit: 'NEW_REQ_UNIT',
        quantity: 30,
      } as any;
      const newRegister = { id: 2, reason: 'new reason' } as any;

      entity.update(updateDto, newRegister, userId);

      expect(entity.code).toBe('NEW_CODE');
      expect(entity.parent).toBe('NEW_PARENT');
      expect(entity.level).toBe(3);
      expect(entity.branches).toBe(4);
      expect(entity.name).toBe('NEW_NAME');
      expect(entity.unit).toBe('NEW_UNIT');
      expect(entity.valMinimun).toBe(20.5);
      expect(entity.valMaximun).toBe(200.87654321);
      expect(entity.priceUs).toBe(100.25);
      expect(entity.priceBs).toBe(400.12345678);
      expect(entity.typeItem).toBe('NEW_TYPE');
      expect(entity.iStock).toBe('NEW_STOCK');
      expect(entity.quantityD).toBe(15);
      expect(entity.quantityH).toBe(25);
      expect(entity.balandeAmount).toBe(40);
      expect(entity.debitBs).toBe(200.75);
      expect(entity.creditBs).toBe(100.125);
      expect(entity.balanceCost).toBe(150.98765432);
      expect(entity.unitRequested).toBe('NEW_REQ_UNIT');
      expect(entity.totalCost).toBe(150.98765432);
      expect(entity.quantity).toBe(30);
      expect(entity.register).toBe(newRegister);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener valores si no se proporcionan en el DTO (parcial)', () => {
      const entity = new ConfigurationTypeMaterial({
        id: 1,
        code: 'OLD_CODE',
        name: 'OLD_NAME',
        valMinimun: 1.0,
        balanceCost: 7.5,
        totalCost: 7.5,
        register: mockRegister,
      });

      const partialDto: UpdateConfigurationTypeMaterialDto = {
        // Solo algunos campos
        nombre: 'UPDATED_NAME',
        precioUs: 50.0,
        // Otros nulos o undefined implícitamente
      } as any;

      entity.update(partialDto, mockRegister, userId); // Mismo register

      expect(entity.code).toBe('OLD_CODE'); // No cambió
      expect(entity.name).toBe('UPDATED_NAME'); // Cambió y uppercase
      expect(entity.valMinimun).toBe(1.0); // No cambió
      expect(entity.priceUs).toBe(50.0); // Cambió
      expect(entity.balanceCost).toBe(7.5); // No cambió (SaldoCosto no en DTO)
      expect(entity.totalCost).toBe(7.5); // No cambió
      expect(entity.register).toBe(mockRegister); // No cambió
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new ConfigurationTypeMaterial({ id: 1, code: 'TEST', name: 'TEST' });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados, incluyendo register parcial', () => {
      const entity = new ConfigurationTypeMaterial({
        id: 1,
        uuid: 'TESTConfigurationTypeMateirlUUID',
        code: 'testCode',
        parent: 'TEST_PARENT',
        level: 1,
        branches: 2,
        name: 'TEST_NAME',
        unit: 'KG',
        valMinimun: 10.5,
        valMaximun: 100.12345678,
        priceUs: 50.75,
        priceBs: 200.98765432,
        typeItem: 'ITEM_TYPE',
        iStock: 'STOCK_LOC',
        quantityD: 5,
        quantityH: 10,
        balandeAmount: 15,
        quantity: 20,
        debitBs: 100.5,
        creditBs: 50.25,
        balanceCost: 75.12345678,
        unitRequested: 'REQ_UNIT',
        totalCost: 75.12345678,
        createUserId: userId,
        createAt: new Date('2025-01-01T10:00:00Z'),
        updateUserId: userId,
        updateAt: new Date('2025-01-01T10:00:00Z'),
        deleteUserId: userId,
        deleteAt: new Date('2025-01-01T10:00:00Z'),
        register: mockRegister,
      });

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1,
        uuid: 'TESTConfigurationTypeMateirlUUID',
        code: 'testCode',
        parent: 'TEST_PARENT',
        level: 1,
        branches: 2,
        name: 'TEST_NAME',
        unit: 'KG',
        valMinimun: 10.5,
        valMaximun: 100.12345678,
        priceUs: 50.75,
        priceBs: 200.98765432,
        typeItem: 'ITEM_TYPE',
        iStock: 'STOCK_LOC',
        quantityD: 5,
        quantityH: 10,
        balandeAmount: 15,
        quantity: 20,
        debitBs: 100.5,
        creditBs: 50.25,
        balanceCost: 75.12345678,
        unitRequested: 'REQ_UNIT',
        totalCost: 75.12345678,
        createAt: entity.createAt,
        createUserId: userId,
        updateAt: entity.updateAt,
        updateUserId: userId,
        deleteAt: null,
        deleteUserId: null,
        register: {
          reason: mockRegister.reason,
          addressDagme: mockRegister.addressDagme,
          timeStart: mockRegister.timeStart,
          timeWater: mockRegister.timeWater,
          perforation: mockRegister.perforation,
          code: mockRegister.code,
          cite: mockRegister.cite,
          timeInit: mockRegister.timeInit,
          timeEnd: mockRegister.timeEnd,
          drillHole: mockRegister.drillHole,
        },
      });
    });

    it('debería retornar null para register si no existe', () => {
      const entity = new ConfigurationTypeMaterial({
        id: 1,
        code: 'testCode',
        createUserId: userId,
        createAt: new Date(),
        register: undefined, // Sin register
      });

      const response = entity.getResponse();

      expect(response.register).toBeNull();
    });
  });
});