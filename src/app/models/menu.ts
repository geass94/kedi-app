import {Color} from "./color";
import {Manufacturer} from "./manufacturer";
import {Category} from "./category";
import {Type} from "serializer.ts/Decorators";

export class Menu {
  @Type(() => Color)
  colors: Color[];
  @Type(() => Manufacturer)
  manufacturers: Manufacturer[];
  @Type(() => Category)
  categories: Category[];
}
