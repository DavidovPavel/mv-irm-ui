import { BaseItem } from '../models/base-item';
import { CheckResult } from '../models/check-result';
import { ErrorMessage } from '../models/error-message';
import { City, ServiceCenter, ServiceCompany } from '../models/service-center';
import { Shop } from '../models/shop';
import { StatusSource } from '../models/status-source';
import { Incident } from './../models/incident';
import { SearchResult } from './../models/search-result';

export const storeKey = 'incidents';

export interface State {
  isLoad: boolean;
  incidentRequest: Incident | null;
  updateSuccessful: boolean | null;
  searchResult: SearchResult<Incident> | null;
  citySource: SearchResult<City> | null;
  shopSource: SearchResult<Shop> | null;
  serviceCenterSource: SearchResult<ServiceCenter> | null;
  serviceCompanySource: SearchResult<ServiceCompany> | null;
  statusSource: StatusSource | null;
  selecChannel: SearchResult<BaseItem>;
  selectBrand: SearchResult<BaseItem>;
  selectBlameServiceCenter: SearchResult<BaseItem>;
  cityItem: City | null;
  shopItem: Shop | null;
  serviceCenterItem: ServiceCenter | null;
  serviceCompanyItem: ServiceCompany | null;
  checkResult: CheckResult | null;
  createResult: ErrorMessage | null;
  permissions: string[];
  createReason: BaseItem[] | null;
}

export const initialState: State = {
  isLoad: false,
  incidentRequest: null,
  updateSuccessful: null,
  searchResult: null,
  citySource: null,
  shopSource: null,
  serviceCenterSource: null,
  serviceCompanySource: null,
  cityItem: null,
  shopItem: null,
  serviceCenterItem: null,
  serviceCompanyItem: null,
  statusSource: null,
  checkResult: null,
  createResult: null,
  permissions: [],
  createReason: null,
  selecChannel: {
    totalSize: 5,
    paginatedQuery: { pageIndex: 0, pageSize: 20 },
    data: [
      { id: 0, name: 'Все' },
      { id: 1, name: 'Магазин' },
      { id: 3, name: 'Интернет-магазин' },
      { id: 4, name: 'Ручная заявка' },
      { id: 5, name: 'Проверка качества' },
    ],
  },
  selectBrand: {
    totalSize: 2,
    paginatedQuery: { pageIndex: 0, pageSize: 20 },
    data: [
      { id: 2, name: 'Мвидео' },
      { id: 3, name: 'Эльдорадо' },
    ],
  },
  selectBlameServiceCenter: {
    totalSize: 3,
    paginatedQuery: { pageIndex: 0, pageSize: 20 },
    data: [
      { id: 0, name: 'Нет значения' },
      { id: 1, name: 'Нет - не вина СЦ' },
      { id: 2, name: 'Да - вина СЦ' },
    ],
  },
};
