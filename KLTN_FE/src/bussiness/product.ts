import { CURRENCY, LANGUAGE } from "./common";

interface IPublisher {
    name: string;
    date: Date;
}

interface IDescription {
    language: LANGUAGE;
    description: string;
}

interface IPrice {
    price: number;
    currency: CURRENCY;
}

interface IFallIntoCate {
    id: string;
    name: string;
}

interface ISizes {
    size: string;
    quantity: number;
}

interface IOptions {
    sizes: ISizes[];
    color: Array<string>;
    features: Array<string>;
}
interface IFallIntoCategories {
    id: string;
    title: string;
}

export interface IProduct {
    id: string;
    title: string;
    descriptions: IDescription[];
    images: Array<string>;
    options: IOptions;
    types: Array<string>;
    trademark: string;
    origin: string;
    price: IPrice;
    discount: number;
    quantity: number;
    fallIntoCategories: IFallIntoCategories;
    reviews: string;
    createdOn: Date;
    updateOn: Date;
    enable: boolean;
}