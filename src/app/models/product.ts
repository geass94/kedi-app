import {Color} from "./color";
import {Manufacturer} from "./manufacturer";
import {Category} from "./category";
import {Type} from "serializer.ts/Decorators";
import {Bundle} from "./bundle";
import {ProductFile} from "./product-file";

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
  productFiles: ProductFile[];
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  quantity: number;
  sale: number;
  bundleSale: number;
  bundlePrice: number;
  @Type(() => Bundle)
  bundle: Bundle;
  countDown: string;
}

export interface ProductPage {
  content: Product[];
  numberOfElements: number;
}
