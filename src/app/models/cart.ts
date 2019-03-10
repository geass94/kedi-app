import {Product} from "./product";
import {Type} from "serializer.ts/Decorators";

export class Cart {
  id: number;
  @Type(() => Product)
  product: Product;
  quantity: number;
  savedForLater: boolean;
  wishlist: boolean;
}
