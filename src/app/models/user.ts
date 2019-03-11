import {Skip} from "serializer.ts/Decorators";

export class User {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  personalInformation: {
    id: number,
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    postCode: string,
    country: string,
    state: string,
    phone: string
  };
  @Skip()
  accessToken?: string;
}
