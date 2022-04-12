export enum Brand {
  'Мвидео' = 2,
  'Эльдорадо' = 3,
}

export interface Shop {
  id: number;
  name: string;
  brand: Brand;
}
