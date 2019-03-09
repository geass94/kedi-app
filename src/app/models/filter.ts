import {Sort} from "./sort";

export class Filter {
  changed = false;
  category = [];
  color = [];
  manufacturer = [];
  minPrice = 0;
  maxPrice = 0;
  sort = new Sort();
}
