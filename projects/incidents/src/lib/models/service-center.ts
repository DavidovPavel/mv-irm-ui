export interface City {
  id: number;
  name: string;
}

export interface ServiceCompany extends City {
  sapId: string;
}

export interface ServiceCenter extends City {
  city: City;
  serviceCompany: ServiceCompany;
}
