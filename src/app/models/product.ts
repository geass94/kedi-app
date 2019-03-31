import {Color} from "./color";
import {Manufacturer} from "./manufacturer";
import {Category} from "./category";
import {Type} from "serializer.ts/Decorators";
import {Bundle} from "./bundle";
import {ProductFile} from "./product-file";
import {Size} from "./size";

export class Product {
  id: number;
  name: string;
  referenceCode: string;
  barCode: string;
  price: number;
  quantity: number;
  totalQuantity: number;
  sale: number;
  description: string;
  promoted: boolean;
  countDown: string;
  //  Specifications
  color: { id: number, name: string };
  size: Size;
  sex: string;
  manufacturer: { id: number, name: string };
  categoryList: Category[];
  //  File attachments
  productFiles: ProductFile[];
  //  Product Variants
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  //  Bundles and gifts
  bundledProducts: Product[];
  makeBundle: boolean;
}

export interface ProductPage {
  content: Product[];
  numberOfElements: number;
}
