import { CheckResult } from './../models/check-result';
import { createAction, props } from '@ngrx/store';
import { BaseItem } from '../models/base-item';

import { IncidentRequestCreateModel } from '../models/incident-request';
import { ParamRequest } from '../models/param-request';
import { City, ServiceCenter, ServiceCompany } from '../models/service-center';
import { Shop } from '../models/shop';
import { StatusSource } from '../models/status-source';
import { UpdateIncident } from '../models/update-incident';
import { UpdateStatusOrComment } from '../models/update-status-comment';
import { ErrorMessage } from './../models/error-message';
import { Incident } from './../models/incident';
import { SearchResult } from './../models/search-result';

export const getIncidentRequest = createAction('[Incidents] Get IncidentRequest', props<{ id: number }>());
export const getIncidentSuccess = createAction('[Incidents] Get IncidentRequest Success', props<{ data: Incident }>());
export const getIncidentFail = createAction(
  '[Incidents] Get IncidentRequest Fail',
  props<{ error: string | string[] }>()
);

export const clearIncident = createAction('[Incidents] Clear Incident');

export const updateIncident = createAction('[Incidents] Update Incident', props<{ data: UpdateIncident }>());
export const updateRequestStatus = createAction(
  '[Incidents] Update Incident RequestStatusTrigger',
  props<{ data: UpdateStatusOrComment }>()
);
export const updateIncidentFail = createAction(
  '[Incidents] Update Incident Fail',
  props<{ error: string | string[] }>()
);

export const addToServiceCenterFileStores = createAction(
  '[Incidents] Add To ServiceCenter File',
  props<{ data: { id: number; items: File[] } }>()
);

export const removeFromServiceCenterFileStores = createAction(
  '[Incidents] Remove From ServiceCenter File',
  props<{ data: { id: number; filesToDelete: number[] } }>()
);

export const downloadFile = createAction('[Incidents] Download File', props<{ id: number }>());
export const downloadFileSuccess = createAction('[Incidents] Download File Success');

export const searchIncident = createAction('[Incidents] Search Incidents', props<{ data: ParamRequest }>());
export const searchIncidentSuccess = createAction(
  '[Incidents] Search Incidents Success',
  props<{ data: SearchResult<Incident> }>()
);
export const searchIncidentFail = createAction(
  '[Incidents] Search Incidents Fail',
  props<{ error: string | string[] }>()
);

export const complicatedSearch = createAction('[Incidents] Complicated Search Incidents', props<{ text: string }>());

export const getShops = createAction('[Incidents] Load Shops', props<{ data: ParamRequest }>());
export const getCities = createAction('[Incidents] Load Cities', props<{ data: ParamRequest }>());
export const getServiceCenters = createAction('[Incidents] Load ServiceCenters', props<{ data: ParamRequest }>());
export const getServiceCompanies = createAction('[Incidents] Load ServiceCompanies', props<{ data: ParamRequest }>());
export const getShopsSuccess = createAction('[Incidents] Load Shops Success', props<{ data: SearchResult<Shop> }>());
export const getCitiesSuccess = createAction('[Incidents] Load Cities Success', props<{ data: SearchResult<City> }>());
export const getServiceCentersSuccess = createAction(
  '[Incidents] Load ServiceCenters Success',
  props<{ data: SearchResult<ServiceCenter> }>()
);
export const getServiceCompaniesSuccess = createAction(
  '[Incidents] Load ServiceCompanies Success',
  props<{ data: SearchResult<ServiceCompany> }>()
);

export const getStatus = createAction('[Incidents] Load Status');
export const getStatusSuccess = createAction('[Incidents] Load Status Success', props<{ data: StatusSource }>());

export const downloadToExcel = createAction('[Incidents] Download To Excel', props<{ data: ParamRequest }>());
export const downloadToExcelSuccess = createAction('[Incidents] Download To Excel Success');

export const getShop = createAction('[Incidents] Load Shop', props<{ id: number }>());
export const getCity = createAction('[Incidents] Load City', props<{ id: number }>());
export const getServiceCenter = createAction('[Incidents] Load ServiceCenter', props<{ id: number }>());
export const getServiceCompany = createAction('[Incidents] Load ServiceCompany', props<{ id: number }>());

export const getShopSuccess = createAction('[Incidents] Load Shop Success', props<{ data: Shop }>());
export const getCitySuccess = createAction('[Incidents] Load Citie Success', props<{ data: City }>());
export const getServiceCenterSuccess = createAction(
  '[Incidents] Load ServiceCenter Success',
  props<{ data: ServiceCenter }>()
);
export const getServiceCompanySuccess = createAction(
  '[Incidents] Load ServiceCompany Success',
  props<{ data: ServiceCompany }>()
);

export const checkNumInCRM = createAction(
  '[Incidents] Check IncidentNumber In CRM',
  props<{ data: { numberZNU: string; incidentNumber: string; } }>()
);

export const checkNumInCRMSuccess = createAction(
  '[Incidents] Check IncidentNumber In CRM Success',
  props<{ message: CheckResult }>()
);

export const createRequest = createAction('[Incident] Create Request', props<{ data: IncidentRequestCreateModel }>());
export const createRequestSuccess = createAction(
  '[Incident] Create Request Success',
  props<{ message: ErrorMessage }>()
);
export const createRequestFail = createAction('[Incident] Create Request Fail', props<{ error: any }>());

export const getPermissions = createAction('[Incident] Get Permissions', props<{ id: number }>());
export const getPermissionsSuccess = createAction('[Incident] Get Permissions Success', props<{ data: string[] }>());
export const getPermissionsFail = createAction('[Incident] Get Permissions Fail', props<{ error: any }>());

export const getCreateReason = createAction('[Incident] Get CreateReason Dictionary');
export const getCreateReasonSuccess = createAction(
  '[Incident] Get CreateReason Dictionary Success',
  props<{ data: BaseItem[] }>()
);
