import { Action, createReducer, on } from '@ngrx/store';

import {
  expandServiceCenter,
  expandServiceCenterSuccess,
  getQuotaGroups,
  getQuotaGroupsSuccess,
  getServiceCenters,
  getServiceCentersSuccess,
  getSettingsSuccess,
  hasQuotasFail,
  hasQuotasSuccess,
  initQuotasFail,
  initQuotasSuccess,
} from './actions';
import { initialState, State } from './state';

const installationQueueReducer = createReducer(
  initialState,
  on(initQuotasSuccess, (state) => ({
    ...state,
    initQuotas: true,
  })),
  on(initQuotasFail, (state) => ({
    ...state,
    initQuotas: false,
  })),
  on(hasQuotasSuccess, (state) => ({
    ...state,
    hadQuotas: true,
  })),
  on(hasQuotasFail, (state) => ({
    ...state,
    hadQuotas: false,
  })),

  on(getQuotaGroups, (state) => ({ ...state, isLoad: true })),
  on(getQuotaGroupsSuccess, (state, { data }) => ({
    ...state,
    isLoad: false,
    quotaGroups: data,
  })),

  on(getServiceCenters, (state) => ({ ...state, isLoad: true })),
  on(getServiceCentersSuccess, (state, { data }) => ({
    ...state,
    serviceCenters: data,
    isLoad: false,
  })),

  on(expandServiceCenter, (state) => ({ ...state, isLoad: true })),
  on(expandServiceCenterSuccess, (state, { data }) => ({
    ...state,
    serviceCenterRegions: data,
    isLoad: false,
  })),

  on(getSettingsSuccess, (state, { settings }) => ({ ...state, settings })),
);

export function reducer(state: State | undefined, action: Action): State {
  return installationQueueReducer(state, action);
}
