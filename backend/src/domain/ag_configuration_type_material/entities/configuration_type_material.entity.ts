/* eslint-disable prettier/prettier */
import { Register } from 'src/domain/ag_register/entities/register.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CreateConfigurationTypeMaterialDto, UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';

@Entity('ag_configuration_type_material')
export class ConfigurationTypeMaterial extends BaseEntity {

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  parent: string;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  branches: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  valMinimun: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  valMaximun: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  priceUs: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  priceBs: number;

  @Column({ nullable: true })
  typeItem: string;

  @Column({ nullable: true })
  iStock: string;

  @Column({ nullable: true })
  quantityD: number;

  @Column({ nullable: true })
  quantityH: number;

  @Column({ nullable: true })
  balandeAmount: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  debitBs: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  creditBs: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  balanceCost: number

  @Column({ nullable: true })
  unitRequested: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 8 })
  totalCost: number

  @ManyToOne(() => Register, register => register.configurationTypeMaterials)
  @JoinColumn({ name: 'register_id' })
  register: Register;

  constructor(data?: Partial<ConfigurationTypeMaterial>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(dto: CreateConfigurationTypeMaterialDto, register, userId: number) {
    const entities = new ConfigurationTypeMaterial();
    entities.code = dto.codigo.toUpperCase();
    entities.parent = dto.padre.toUpperCase();
    entities.level = dto.nivel;
    entities.branches = dto.ramas;
    entities.name = dto.nombre.toUpperCase();
    entities.unit = dto.unidad.toUpperCase();
    entities.valMinimun = dto.valMinimo;
    entities.valMaximun = dto.valMaximo;
    entities.priceUs = dto.precioUs;
    entities.priceBs = dto.PrecioBs;
    entities.typeItem = dto.tipoItem.toUpperCase();
    entities.iStock = dto.iAlmacen.toUpperCase();
    entities.quantityD = dto.cantidadD;
    entities.quantityH = dto.cantidadH;
    entities.balandeAmount = dto.saldoCantidad;
    entities.debitBs = dto.debeBs;
    entities.creditBs = dto.HaberBs;
    entities.balanceCost = dto.SaldoCosto;
    entities.unitRequested = dto.unit;
    entities.totalCost = dto.SaldoCosto;
    entities.quantity = dto.quantity;
    entities.register = register;
    entities.createUserId = userId;
    entities.createAt = new Date()
    return entities;
  }
  //para el control de si son nulos o indefinidos y ademas poner en mayusculas
  private assignValue<T>(
    newValue: T | null | undefined,
    currentValue: T,
    transform?: (val: T) => T,
  ): T {
    if (newValue == null) return currentValue;
    return transform ? transform(newValue) : newValue;
  }

  update(dto: UpdateConfigurationTypeMaterialDto, register: any, userId: number) {
    this.code = this.assignValue(dto.codigo, this.code, x => x.toUpperCase());
    this.parent = this.assignValue(dto.padre, this.parent, x => x.toUpperCase());
    this.level = this.assignValue(dto.nivel, this.level);
    this.branches = this.assignValue(dto.ramas, this.branches);
    this.name = this.assignValue(dto.nombre, this.name, x => x.toUpperCase());
    this.unit = this.assignValue(dto.unidad, this.unit, x => x.toUpperCase());
    this.valMinimun = this.assignValue(dto.valMinimo, this.valMinimun);
    this.valMaximun = this.assignValue(dto.valMaximo, this.valMaximun);
    this.priceUs = this.assignValue(dto.precioUs, this.priceUs);
    this.priceBs = this.assignValue(dto.PrecioBs, this.priceBs);
    this.typeItem = this.assignValue(dto.tipoItem, this.typeItem, x => x.toUpperCase());
    this.iStock = this.assignValue(dto.iAlmacen, this.iStock, x => x.toUpperCase());
    this.quantityD = this.assignValue(dto.cantidadD, this.quantityD);
    this.quantityH = this.assignValue(dto.cantidadH, this.quantityH);
    this.balandeAmount = this.assignValue(dto.saldoCantidad, this.balandeAmount);
    this.debitBs = this.assignValue(dto.debeBs, this.debitBs);
    this.creditBs = this.assignValue(dto.HaberBs, this.creditBs);
    this.balanceCost = this.assignValue(dto.SaldoCosto, this.balanceCost);
    this.unitRequested = this.assignValue(dto.unit, this.unitRequested);
    this.totalCost = this.assignValue(dto.SaldoCosto, this.totalCost);
    this.quantity = this.assignValue(dto.quantity, this.quantity);
    this.register = this.assignValue(register, this.register);
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this;
  }

  delete(user: number) {
    this.deleteUserId = user;
    this.deleteAt = new Date();
    return this;
  }

  getResponse() {
    return {
      id: this.id,
      uuid: this.uuid,
      code: this.code,
      parent: this.parent,
      level: this.level,
      branches: this.branches,
      name: this.name,
      unit: this.unit,
      valMinimun: this.valMinimun,
      valMaximun: this.valMaximun,
      priceUs: this.priceUs,
      priceBs: this.priceBs,
      typeItem: this.typeItem,
      iStock: this.iStock,
      quantityD: this.quantityD,
      quantityH: this.quantityH,
      balandeAmount: this.balandeAmount,
      quantity: this.quantity,
      debitBs: this.debitBs,
      creditBs: this.creditBs,
      balanceCost: this.balanceCost,
      unitRequested: this.unitRequested,
      totalCost: this.totalCost,
      createUserId: this.createUserId,
      createAt: this.createAt,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt,
      deleteUserId: null,
      deleteAt: null,

      register: this.register ? {
        reason: this.register.reason,
        addressDagme: this.register.addressDagme,
        timeStart: this.register.timeStart,
        timeWater: this.register.timeWater,
        perforation: this.register.perforation,
        code: this.register.code,
        cite: this.register.cite,
        timeInit: this.register.timeInit,
        timeEnd: this.register.timeEnd,
        drillHole: this.register.drillHole,
      } : null,
    };
  }
}
