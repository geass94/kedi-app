export class Product {
  id: number;
  name: string;
  price: number;
  color: {id: number, name: string};
  size: string;
  sex: string;
  description: string;
  manufacturer: {id: number, name: string};
  categoryList: [
    {
      id: number,
      name: string
    }
    ];
  productFiles: [{
    id: number,
    name: string,
    filType: string,
    fileUrl: string
  }];
}
