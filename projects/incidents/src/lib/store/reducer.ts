import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './actions';
import { initialState, State } from './state';

const incidentReducer = createReducer(
  initialState,
  on(actions.getIncidentRequest, (state) => ({ ...state, isLoad: true })),
  on(actions.getIncidentFail, (state) => ({ ...state, isLoad: false })),
  on(actions.getIncidentSuccess, (state, { data }) => ({
    ...state,
    isLoad: false,
    incidentRequest: data,
  })),
  on(actions.clearIncident, (state) => ({ ...state, incidentRequest: null })),
  on(actions.updateIncident, (state) => ({ ...state, isLoad: true })),
  on(actions.updateIncidentFail, (state) => ({ ...state, isLoad: false })),
  on(actions.updateRequestStatus, (state) => ({ ...state, isLoad: true })),
  on(actions.updateIncidentFail, (state) => ({ ...state, isLoad: false })),

  on(actions.searchIncidentSuccess, (state, { data }) => ({ ...state, searchResult: data })),
  on(actions.getShopsSuccess, (state, { data }) => ({ ...state, shopSource: data })),
  on(actions.getCitiesSuccess, (state, { data }) => ({ ...state, citySource: data })),
  on(actions.getServiceCentersSuccess, (state, { data }) => ({ ...state, serviceCenterSource: data })),
  on(actions.getServiceCompaniesSuccess, (state, { data }) => ({ ...state, serviceCompanySource: data })),
  on(actions.getShopSuccess, (state, { data }) => ({ ...state, shopItem: data })),
  on(actions.getCitySuccess, (state, { data }) => ({ ...state, cityItem: data })),
  on(actions.getServiceCenterSuccess, (state, { data }) => ({ ...state, serviceCenterItem: data })),
  on(actions.getServiceCompanySuccess, (state, { data }) => ({ ...state, serviceCompanyItem: data })),
  on(actions.getStatusSuccess, (state, { data }) => ({ ...state, statusSource: data })),
  on(actions.checkNumInCRMSuccess, (state, { message }) => ({ ...state, checkResult: message })),
  on(actions.createRequestSuccess, (state, { message }) => ({
    ...state,
    createResult: { errCode: '00', errMessage: '' },
  })),
  on(actions.createRequestFail, (state, { error }) => ({
    ...state,
    createResult: { errCode: '--', errMessage: error },
  })),
  on(actions.getPermissions, (state) => ({ ...state, isLoad: true })),
  on(actions.getPermissionsSuccess, (state, { data }) => ({ ...state, permissions: data, isLoad: false })),
  on(actions.getPermissionsFail, (state, { error }) => ({ ...state, isLoad: false })),

  on(actions.getCreateReasonSuccess, (state, { data }) => ({ ...state, createReason: data }))
);

export function reducer(state: State | undefined, action: Action): State {
  return incidentReducer(state, action);
}
