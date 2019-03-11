import {Product} from "./product";
import {Address} from "./address";

export class Order {
  id: number;
  uuid: string;
  products: Product[];
  // transactions = new HashSet<>();
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  shippingMethod: string;
  subTotal: number;
}
