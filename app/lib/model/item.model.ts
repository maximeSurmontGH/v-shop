export interface AirTableItem {
  name: string;
  price: number;
  stock: number;
}

export interface Item extends AirTableItem {
  id: string;
}
