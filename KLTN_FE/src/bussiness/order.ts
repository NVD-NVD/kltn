import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {
  address: {
    city: string;
    country: string;
    district: string;
    number: string;
    street: string;
    ward: string;
  };
  total: {
    currency: string;
    price: number;
  };
  user: IUser;

  enable: boolean;
  id: "string";
  note: "string";
  payment: {
    id: "string";
  };
  phone: "string";
  processing: "string";
  productsInOrder: Array<IProduct>;
}
