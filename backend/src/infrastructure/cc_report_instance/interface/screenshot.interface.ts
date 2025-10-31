/* eslint-disable prettier/prettier */
export interface IChainOfCustodySnapshot {
  id: number;
  codeCustody: string;
  laboratoryMB: boolean;
  laboratoryFQ: boolean;
  codeThermohygrometer: string;
  codeThermometerMM: string;
  codeThermometer: string;
  codeColorimeter: string;
  initialConservative: string;
  createAt: Date; 
  updateAt: Date | null;
  deleteAt: Date | null;
  applicant: IApplicantSnapshot;
  transport: ITransportSnapshot;
  configurationVersion: IConfigurationVersionSnapshot;
  samplings: ISamplingSnapshot[];
  // reports?: IReportSnapshot[];
}

export interface IApplicantSnapshot {
  id: number;
  entityName: string;
  location: string;
  referencePerson: string;
  phone: string;
  createUserId?: number;
  updateUserId?: number;
  deleteUserId?: number;
  createAt: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}

export interface ITransportSnapshot {
  id: number;
  responsable: string;
  userId: number;
  distanceTraveled: string;
  conservativeArrivalStretch: string;
  maximumStretch: string;
  initDate: Date;
  endDate: Date;
  initTime: string;
  endTime: string;
  createUserId?: number;
  updateUserId?: number;
  deleteUserId?: number;
  createAt: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}

export interface IConfigurationVersionSnapshot {
  id: number;
  codeConfiguration: string;
  versionConfiguration: string;
  createAt: Date;
  updateAt?: Date | null;
  deleteAt?: Date | null;
}

export interface ISamplingSnapshot {
  id: number;
  typeCode: string;
  sampleCode: string;
  description: string;
  quantity: number;
  sampleLocation: string;
  samplePoint: string;
  samplingDay: Date;
  samplingTime: string;
  samplingTechnique: string;
  samplingTechniqueM: string;
  sourceOfSupply: string;
  coordinatesX: string;
  coordinatesY: string;
  condAmbB: number;
  condAmbT: number;
  ciResA: number;
  ciResB: number;
  samplingAceptation?: string | null;
  statusPh: boolean;
  statusClr: boolean;
  testResults: ITestResultSnapshot[];
  createAt: Date;
  updateAt?: Date | null;
  deleteAt: Date | null;
}

export interface ITestResultSnapshot {
  id: number;
  parameter: string;
  valueA: number;
  valueB: number;
  average: number;
  result: number;
  usedFormula: boolean;
  createAt: Date;
  updateAt?: Date | null;
  deleteAt: Date | null;
  configuration: IConfigurationSnapshot;
}

export interface IConfigurationSnapshot {
  id: number;
  formula: string;
  instrumentUsed: string;
  statusConfiguration: boolean;
  approvedByApps: boolean;
  createAt: Date;
  updateAt?: Date | null;
  deleteAt: Date | null;
}