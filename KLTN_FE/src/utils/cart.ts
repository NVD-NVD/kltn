import { number, string } from "yup";
import { IProduct } from "../bussiness/product";
import { CART_KEY, getLocalStorage, setLocalStorage } from "./localStorage";
import { notifyError, notifySuccess } from "./notify";
export interface IProductCart {
  options: {
    color: string[];
    features: string[];
    sizes: [
      {
        quantity: number;
        size: string;
      }
    ];
  };
  productID: string;
  quantity: number;
  discount: number;
  price: any;
  title: any;
  img: Array<string>;
  defaultOptions: {
    color: Array<string> | undefined;
    features: Array<string> | undefined;
    sizes:
      | [
          {
            quantity: number;
            size: string;
          }
        ]
      | undefined;
  };
}
export const handleAddToCart = (book: IProductCart) => {
  let pro = book;
  let listCart: any = getLocalStorage(CART_KEY);
  listCart = JSON.parse(listCart) as IProductCart;
  notifySuccess(`Added ${book.title} to cart`);

  if (listCart && listCart.length > 0) {
    const validProduct = (listCart as IProductCart[]).findIndex((product) => {
      console.log(product);
      // return product.productID === pro.productID && product.options.color === pro.options.color && product.options.sizes[0].size === pro.options.sizes[0].size
      return (
        product.productID === pro.productID &&
        product.options.color[0] === pro.options.color[0] &&
        product.options.sizes[0].size === pro.options.sizes[0].size
      );
    });
    console.log(validProduct);
    console.log(pro);

    if (validProduct === -1) {
      const newArray = [pro].concat(listCart); // [ 4, 3, 2, 1 ]
      setLocalStorage(CART_KEY, newArray);
      return;
    }
    const newCart = (listCart as IProductCart[]).map((product) => {
      // if (product.productID === pro.productID && product.options.color === pro.options.color && product.options.sizes[0].size === pro.options.sizes[0].size) {
      //     product.quantity += pro.quantity;
      // }
      if (
        product.productID === pro.productID &&
        product.options.color[0] === pro.options.color[0] &&
        product.options.sizes[0].size === pro.options.sizes[0].size
      ) {
        product.quantity = Number(product.quantity) + Number(pro.quantity);
      }
      return product;
    });
    setLocalStorage(CART_KEY, newCart);
    return;
  }

  setLocalStorage(CART_KEY, [book]);
};
