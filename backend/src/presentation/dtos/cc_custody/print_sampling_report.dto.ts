/* eslint-disable prettier/prettier */
import { Technique } from "src/domain/cc_sampling/enum/technique.enum";
export class DataClass {
  id?: number;
  codeCustody?: string;
  laboratoryMB?: boolean;
  laboratoryFQ?: boolean;
  codeThermohygrometer?: string;
  codeThermometerMM?: string;
  codeThermometer?: string;
  codeColorimeter?: string;
  initialConservative?: string;
  createUserId?: number;
  updateUserId?: number | null;
  deleteUserId?: number | null;
  createAt?: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
  samplings?: Sampling[];
  transport?: Transport;
  applicant?: Applicant;
}

export class Sampling {
  id?: number;
  sampleCode?: string;
  description?: string;
  sourceOfSupply?: string;
  quantity?: number;
  sampleLocation?: string;
  samplePoint?: string;
  coordinatesX?: string;
  coordinatesY?: string;
  samplingTechnique?: Technique;
  samplingTechniqueM?: string;
  ciResA?: number;
  ciResB?: number;
  condAmbT?: number;
  condAmbB?: number;
  samplingDay?: Date;
  samplingTime?: string;
  samplingConditions?: string[];
  samplingAceptation?: string;
  createUserId?: number;
  updateUserId?: number | null;
  deleteUserId?: number | null;
  createAt?: Date | null;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}

export class Transport {
  id?: number;
  responsable?: string;
  userId?: number;
  distanceTraveled?: string;
  conservativeArrivalStretch?: string;
  maximumStretch?: string;
  initDate?: Date;
  endDate?: Date;
  initTime?: string;
  endTime?: string;
  createUserId?: number;
  updateUserId?: number | null;
  deleteUserId?: number | null;
  createAt?: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}

export class Applicant {
  id?: number;
  entityName?: string;
  location?: string;
  referencePerson?: string;
  phone?: string;
  createAt?: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}
