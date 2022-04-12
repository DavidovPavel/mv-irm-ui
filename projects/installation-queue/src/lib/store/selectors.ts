import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, storeKey } from './state';

export const selectState = createFeatureSelector<State>(storeKey);
export const selectLoadProcess = createSelector(selectState, (state) => state.isLoad);
export const selectInitQuotas = createSelector(selectState, (state) => state.initQuotas);
export const selectHasQuotas = createSelector(selectState, (state) => state.hadQuotas);
export const selectQuotaGroups = createSelector(selectState, (state) => state.quotaGroups);
export const selectServiceCenters = createSelector(selectState, (state) => state.serviceCenters);
export const selectServiceCenterRegions = createSelector(selectState, (state) => state.serviceCenterRegions);
export const selectSettings = createSelector(selectState, (state) => state.settings);
