import {Color} from "./color";
import {Manufacturer} from "./manufacturer";
import {Category} from "./category";
import {Type} from "serializer.ts/Decorators";
import {Bundle} from "./bundle";

export class Product {
  id: number;
  name: string;
  price: number;
  @Type(() => Color)
  color: Color;
  size: string;
  sex: string;
  description: string;
  @Type(() => Manufacturer)
  manufacturer: Manufacturer;
  @Type(() => Category)
  categoryList: Category[];
  productFiles: [{
    id: number,
    name: string,
    filType: string,
    fileUrl: string
  }];
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  quantity: number;
  sale: number;
  bundleSale: number;
  bundlePrice: number;
  @Type(() => Bundle)
  bundle: Bundle;
}

export interface ProductPage {
  content: Product[];
  numberOfElements: number;
}
