export interface QuotaGroups {
  total: number;
  updated: string;
  withQuotas: number;
  withoutQuotas: number;
  quotaGroups: QuotaGroup[] | null;
}

export interface QuotaGroup {
  id: number;
  name: string;
  hasQuotas: boolean;
}

export interface ServiceCenters {
  total: number;
  updated: string;
  withQuotas: number;
  withoutQuotas: number;
  serviceCenters: ServiceCenter[] | null;
}
export interface ServiceCenter {
  id: number;
  name: string;
  hasQuotas: boolean;
  isExpand: boolean;
  regions: Regions;
}

export interface Regions {
  total: number;
  withQuotas: number;
  withoutQuotas: number;
  regions: Region[];
}

export interface Region {
  id: number;
  hasQuotas: boolean;
  name: string;
  limits: Limit[];
}

export interface Limit {
  id: number;
  limit: number;
  reserve: number;
  date: string;
}
export interface ReportSettings {
  id: number;
  numberOfDaysWithDateTo: number;
  numberOfDaysWithDateFrom: number;
  serviceIds: number[];
}

export interface City {
  id: number;
  name: string;
}
