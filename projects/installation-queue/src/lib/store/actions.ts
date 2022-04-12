import { createAction, props } from '@ngrx/store';
import { QuotaGroups, ServiceCenters, Regions, ReportSettings } from './models';

export const initQuotas = createAction('[InstallationQueue] Init Quotas');
export const initQuotasSuccess = createAction('[InstallationQueue] Init Quotas Success');
export const initQuotasFail = createAction(
  '[InstallationQueue] Init Quotas Fail',
  props<{ error: string | string[] }>()
);

export const hasQuotas = createAction('[InstallationQueue] Get HasQuotas');
export const hasQuotasSuccess = createAction('[InstallationQueue] Get HasQuotas Success');
export const hasQuotasFail = createAction(
  '[InstallationQueue] Get HasQuotas Fail',
  props<{ error: string | string[] }>()
);

export const getQuotaGroups = createAction('[InstallationQueue] Get QuotaGroups', props<{ sapId: string }>());
export const getQuotaGroupsSuccess = createAction(
  '[InstallationQueue] Get QuotaGroups Success',
  props<{ data: QuotaGroups }>()
);
export const getQuotaGroupsFail = createAction(
  '[InstallationQueue] Get QuotaGroups Fail',
  props<{ error: string | string[] }>()
);

export const getServiceCenters = createAction(
  '[InstallationQueue] Get ServiceCenters',
  props<{ sapId: string; quotaGroupId: number }>()
);
export const getServiceCentersSuccess = createAction(
  '[InstallationQueue] Get ServiceCenters Success',
  props<{ data: ServiceCenters }>()
);
export const getServiceCentersFail = createAction(
  '[InstallationQueue] Get ServiceCenters Fail',
  props<{ error: string | string[] }>()
);

export const expandServiceCenter = createAction(
  '[InstallationQueue] Expand ServiceCenter',
  props<{ sapId: string; quotaGroupId: number; serviceCenterId: number }>()
);
export const expandServiceCenterSuccess = createAction(
  '[InstallationQueue] Expand ServiceCenter Success',
  props<{ data: Regions }>()
);
export const expandServiceCenterFail = createAction(
  '[InstallationQueue] Expand ServiceCenter Fail',
  props<{ error: string | string[] }>()
);

export const getSettings = createAction('[InstallationQueue] Get Settings Range');
export const getSettingsSuccess = createAction(
  '[InstallationQueue] Get Settings Success',
  props<{ settings: ReportSettings }>()
);
