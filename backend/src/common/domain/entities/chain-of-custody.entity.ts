/* eslint-disable prettier/prettier */
import { Sampling } from 'src/domain/cc_sampling/entities/sampling.entity';
import { BaseAggregateRoot } from 'src/common/domain/base-aggregate-root';
import { DomainException } from 'src/common/domain/exceptions/domain.exception';
import {
  CustodyCode,
  InstrumentCode,
  InitialConservative,
} from '../../../domain/value-objects/index.value-object';
import { ChainOfCustodyCreatedEvent } from '../events/chain-of-custody-created.event';

export class ChainOfCustody extends BaseAggregateRoot {
  id: number;
  codeCustody: CustodyCode;
  laboratoryMB: boolean;
  laboratoryFQ: boolean;
  codeThermohygrometer: InstrumentCode;
  codeThermometerMM: InstrumentCode;
  codeThermometer: InstrumentCode;
  codeColorimeter: InstrumentCode;
  initialConservative: InitialConservative;
  configurationVersionId: number;
  createUserId: number;
  updateUserId: number | null;
  deleteUserId: number | null;
  createAt: Date;
  updateAt: Date | null;
  deleteAt: Date | null;
  samplings: Sampling[];

  private constructor(
    id: number,
    codeCustody: CustodyCode,
    laboratoryMB: boolean,
    laboratoryFQ: boolean,
    codeThermohygrometer: InstrumentCode,
    codeThermometerMM: InstrumentCode,
    codeThermometer: InstrumentCode,
    codeColorimeter: InstrumentCode,
    initialConservative: InitialConservative,
    configurationVersionId: number,
    createUserId: number,
  ) {
    super();
    this.id = id;
    this.codeCustody = codeCustody;
    this.laboratoryMB = laboratoryMB;
    this.laboratoryFQ = laboratoryFQ;
    this.codeThermohygrometer = codeThermohygrometer;
    this.codeThermometerMM = codeThermometerMM;
    this.codeThermometer = codeThermometer;
    this.codeColorimeter = codeColorimeter;
    this.initialConservative = initialConservative;
    this.configurationVersionId = configurationVersionId;
    this.createUserId = createUserId;
    this.createAt = new Date();
    this.samplings = [];
  }

  public static createNew(
    id: number,
    currentCustodyCount: number,
    configVersionId: number,
    createUserId: number,
    createChainOfCustodyDto: {
      laboratoryMB: boolean;
      laboratoryFQ: boolean;
      codeThermohygrometer: string;
      codeThermometerMM: string;
      codeThermometer: string;
      codeColorimeter: string;
      initialConservative: string;
    },
  ): ChainOfCustody {
    const code = `DCCE - ${currentCustodyCount + 1}`;
    const custodyCode = new CustodyCode(code);

    const newCustody = new ChainOfCustody(
      id,
      custodyCode,
      createChainOfCustodyDto.laboratoryMB,
      createChainOfCustodyDto.laboratoryFQ,
      new InstrumentCode(createChainOfCustodyDto.codeThermohygrometer),
      new InstrumentCode(createChainOfCustodyDto.codeThermometerMM),
      new InstrumentCode(createChainOfCustodyDto.codeThermometer),
      new InstrumentCode(createChainOfCustodyDto.codeColorimeter),
      new InitialConservative(createChainOfCustodyDto.initialConservative),
      configVersionId,
      createUserId,
    );

    newCustody.addDomainEvent(
      new ChainOfCustodyCreatedEvent(
        newCustody.id,
        newCustody.codeCustody.value,
        newCustody.createUserId,
      ),
    );
    return newCustody;
  }
  public updateDetails(
    updateDto: {
      laboratoryMB?: boolean;
      laboratoryFQ?: boolean;
      codeThermohygrometer?: string;
      codeThermometerMM?: string;
      codeThermometer?: string;
      codeColorimeter?: string;
      initialConservative?: string;
    },
    updateUserId: number,
  ): void {
    if (updateDto.laboratoryMB !== undefined) {
      this.laboratoryMB = updateDto.laboratoryMB;
    }
    if (updateDto.laboratoryFQ !== undefined) {
      this.laboratoryFQ = updateDto.laboratoryFQ;
    }
    if (updateDto.codeThermohygrometer !== undefined) {
      this.codeThermohygrometer = new InstrumentCode(
        updateDto.codeThermohygrometer,
      );
    }
    if (updateDto.codeThermometerMM !== undefined) {
      this.codeThermometerMM = new InstrumentCode(
        updateDto.codeThermometerMM,
      );
    }
    if (updateDto.codeThermometer !== undefined) {
      this.codeThermometer = new InstrumentCode(updateDto.codeThermometer);
    }
    if (updateDto.codeColorimeter !== undefined) {
      this.codeColorimeter = new InstrumentCode(updateDto.codeColorimeter);
    }
    if (updateDto.initialConservative !== undefined) {
      this.initialConservative = new InitialConservative(
        updateDto.initialConservative,
      );
    }

    this.updateUserId = updateUserId;
    this.updateAt = new Date();
  }

  public softDelete(deleteUserId: number): void {
    if (this.deleteAt !== null) {
      throw new DomainException('Chain of Custody is already deleted.');
    }
    if (this.samplings && this.samplings.some((s) => s.deleteAt === null)) {
      throw new DomainException(
        'Cannot delete Chain of Custody with active samplings.',
      );
    }

    this.deleteAt = new Date();
    this.deleteUserId = deleteUserId;
  }
}
