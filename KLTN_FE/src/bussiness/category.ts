import { IProduct } from "./product";

export interface ICategoryName {
    id: string;
    title: string;
}

export interface ICategory {
    productsOfCategory: IProduct[];
    enable: true;
    id: string;
    title: string;
}
