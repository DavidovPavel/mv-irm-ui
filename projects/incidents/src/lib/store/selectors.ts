import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, storeKey } from './state';

export const selectState = createFeatureSelector<State>(storeKey);
export const selectIncidentRequest = createSelector(selectState, (state) => state.incidentRequest);
export const selectIsLoad = createSelector(selectState, (state) => state.isLoad);

export const selectSearchResult = createSelector(selectState, (state) => state.searchResult);
export const selectCities = createSelector(selectState, (state) => state.citySource);
export const selectShops = createSelector(selectState, (state) => state.shopSource);
export const selectServiceCenters = createSelector(selectState, (state) => state.serviceCenterSource);
export const selectServiceCompanies = createSelector(selectState, (state) => state.serviceCompanySource);

export const selectCity = createSelector(selectState, (state) => state.cityItem);
export const selectShop = createSelector(selectState, (state) => state.shopItem);
export const selectServiceCenter = createSelector(selectState, (state) => state.serviceCenterItem);
export const selectServiceCompany = createSelector(selectState, (state) => state.serviceCompanyItem);

export const selectStatusData = createSelector(selectState, (state) => state.statusSource);

export const selectSalesChannel = createSelector(selectState, (state) => state.selecChannel);
export const selectBrand = createSelector(selectState, (state) => state.selectBrand);
export const selectBlameServiceCenter = createSelector(selectState, (state) => state.selectBlameServiceCenter);
export const selectCheckResult = createSelector(selectState, (state) => state.checkResult);
export const selectCreateResult = createSelector(selectState, (state) => state.createResult);

export const selectPermissions = createSelector(selectState, (state) => state.permissions);

export const selectCreationReason = createSelector(selectState, (state) => state.createReason);
