import { QuotaGroups, Regions, ReportSettings, ServiceCenters } from './models';

export const storeKey = 'installation-queue';

export interface State {
  isLoad: boolean;
  initQuotas: boolean;
  hadQuotas: boolean;
  quotaGroups: QuotaGroups | null;
  serviceCenters: ServiceCenters | null;
  serviceCenterRegions: Regions | null;
  settings: ReportSettings | null;
}

export const initialState: State = {
  isLoad: false,
  initQuotas: false,
  hadQuotas: false,
  quotaGroups: null,
  serviceCenters: null,
  serviceCenterRegions: null,
  settings: null
};
