import {Product} from "./product";

export class Bundle {
  i: number;
  parent: Product;
  products: Product[];
  price: number;
  sale: number;
}
