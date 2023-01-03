import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCartAsync } from "../../../../apis/cart/deletecart.api";
import { getAllCartAsync } from "../../../../apis/cart/getallcart.api";
import { updateCartAsync } from "../../../../apis/cart/updatecart.api";
import { IProduct } from "../../../../bussiness/product";
import {
  CART_KEY,
  getLocalStorage,
  setLocalStorage,
} from "../../../../utils/localStorage";
import {
  moneyFormater,
  moneyFormaterDong,
} from "../../../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import "./style.scss";
import { IProductCart } from "../../../../utils/cart";
import { createOrderAsync } from "../../../../apis/order/createOrder.api";
import { getInfoAsync } from "../../../../apis/auths/getInfo.api";
import { getDetailProductAsync } from "../../../../apis/product/getdetailproduct.api";
interface Props {}

const CartInfo = (props: Props) => {
  const [cartList, setCartList] = useState<IProductCart[]>([]);
  const [sizeSelected, setSizeSelected] = useState<Array<any>>([]);
  console.log(cartList);
  const [activeProduct, setActiveProduct] = React.useState(0);
  const [userInfo, setUserInfo] = useState<any>();
  const [itemEdited, setItemEdited] = useState<any>();
  const [sizeEdited, setSizeEdited] = useState<any>();
  const [totalEdited, setTotalEdited] = useState<any>();
  const [quantityEdited, setQuantityEdited] = useState<any>();
  const [sizeOrigin, setSizeOrigin] = useState<any>();
  const [finalList, setFinalList] = useState<any>([]);

  const history = useHistory();
  const handleRemoveFromCart = async (id: string, index: number) => {
    console.log(index);
    let cart: any = getLocalStorage(CART_KEY);
    if (!cart) {
      //notifyError('Sorry something went wrong');
      return;
    }
    cart = JSON.parse(cart);
    (cart as IProduct[]).splice(index, 1);
    console.log(cart);
    setLocalStorage(CART_KEY, cart);
    setCartList(cart);
    notifySuccess("Item removed from cart");
  };
  const handleRemoveFinalList = (item: IProductCart) => {
    return setFinalList([...finalList].filter((l: any) => l !== item));
  };
  const handleChangeSize = () => {
    setCartList(
      [...cartList].map((e: IProductCart) => {
        if (e === itemEdited) {
          let p = e;
          p.options.sizes = [sizeEdited];
          p.quantity = quantityEdited;
          return p;
        } else {
          return e;
        }
      })
    );
  };
  // remove product from local storage
  useEffect(() => {
    if (cartList.length > 0) setLocalStorage(CART_KEY, cartList);
  }, [cartList]);
  useEffect(() => {
    setSizeSelected([]);
  }, [activeProduct]);

  React.useEffect(() => {
    getInfoAsync().then((rs: any) => {
      setUserInfo(rs?.data);
    });
  }, []);
  React.useEffect(() => {
    handleChangeSize();
  }, [sizeEdited, quantityEdited]);
  React.useEffect(() => {
    if (sizeEdited !== sizeOrigin) {
      setQuantityEdited(1);
    }
  }, [sizeEdited]);
  React.useEffect(() => {
    let size = [...cartList].find((i: any) => i === itemEdited)?.options
      .sizes[0];
    setSizeEdited(size);
    setSizeOrigin(size);
    setQuantityEdited(
      [...cartList].find((i: any) => i === itemEdited)?.quantity
    );
  }, [itemEdited]);

  React.useEffect(() => {
    const cart = getLocalStorage(CART_KEY);
    if (!cart) return;
    let temp = JSON.parse(cart);
    let temp2 = JSON.parse(cart);
    temp?.map((t: any) => {
      getDetailProductAsync({ id: t.productID }).then((rs: any) => {
        if (rs && rs?.data) {
          if (!rs?.data.enable) {
            let i = temp.findIndex((p: any) => p.productID === t.productID);
            temp2.splice(i, 1);
          }
        }
      });
    });
    setCartList(temp2);
  }, []);

  const totalCost =
    finalList.length > 0 &&
    finalList.reduce(
      (prev: any, current: any) =>
        prev +
        (current.price - (current.discount * current.price) / 100) *
          current.quantity,
      0
    );
  const createOrder = () => {
    if (finalList.length > 0) {
      localStorage.setItem("order", JSON.stringify(finalList));
      history.push("/checkout");
    } else {
      notifyError("Chưa chọn sản phẩm");
    }
  };

  return (
    <div>
      <section className="ftco-section ftco-cart">
        <div className="container wrapper">
          <div className="row">
            <div className="col-md-12 ftco-animate">
              <div className="cart-list">
                <div className="btns">
                  <div
                    className="select-all"
                    onClick={() => {
                      setFinalList(cartList);
                    }}
                  >
                    Chọn hết
                  </div>
                  <div
                    className="deselect-all"
                    onClick={() => {
                      setFinalList([]);
                    }}
                  >
                    Bỏ chọn hết
                  </div>
                </div>
                <div className="table">
                  <div className="table-row table-head">
                    <div className="select"></div>
                    <div className="name">Tên sản phẩm</div>
                    <div className="colors">Màu sắc</div>
                    <div className="sizes-wrapper">Size</div>
                    <div className="price">Giá</div>
                    <div className="quantity">Số lượng</div>
                    <div className="sum">Tổng tiền</div>
                    <div className="assets">Hình ảnh</div>
                    <div className="actions">Sửa/Xóa</div>
                  </div>
                  {cartList.length > 0 &&
                    cartList?.map((e: IProductCart, key: any) => {
                      let isEdited =
                        e.productID === itemEdited?.productID &&
                        e.options === itemEdited?.options &&
                        e.quantity === itemEdited?.quantity;
                      let isAddedToCart = finalList?.findIndex(
                        (item: IProductCart) => {
                          return (
                            item.productID === e.productID &&
                            item.options.color[0] === e.options.color[0] &&
                            item.options.sizes[0].size ===
                              e.options.sizes[0].size
                          );
                        }
                      );
                      console.log("added", isAddedToCart);
                      return (
                        <div
                          className={isEdited ? "table-row edit" : "table-row"}
                          key={key}
                          // onClick={() => setItemEdited(e.productID)}
                        >
                          <div className="select">
                            <input
                              type="checkbox"
                              checked={isAddedToCart !== -1 ? true : false}
                              onClick={() => {
                                if (isAddedToCart !== -1) {
                                  console.log("tem before", finalList);
                                  let tem = finalList.filter((item: any) => {
                                    return item !== e;
                                  });
                                  console.log("tem", tem);
                                  setFinalList([...tem]);
                                } else {
                                  let temp = finalList;
                                  temp?.push(e);
                                  setFinalList([...temp]);
                                }
                              }}
                            />
                          </div>
                          <div className="name">{e?.title}</div>
                          <div className="colors">
                            {e?.options?.color?.map((c: any) => (
                              <div className="color">{c}</div>
                            ))}
                          </div>
                          <div className="sizes-wrapper">
                            <div
                              className="sizes"
                              onClick={() => {
                                // handleChangeSize(s.size, e.id);
                              }}
                            >
                              {isEdited ? (
                                e.defaultOptions?.sizes?.map((s: any) => {
                                  const isContained =
                                    s?.size === e.options.sizes[0]?.size;

                                  return (
                                    <div
                                      className={
                                        isContained ? "size active" : "size"
                                      }
                                      onClick={() => {
                                        setSizeEdited(s);
                                      }}
                                    >
                                      {s.size}
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="size">
                                  {e.options.sizes[0]?.size}
                                </div>
                              )}
                            </div>

                            {/* {activeProduct === key && (
                            <div className="selected-sizes">
                              {sizeSelected?.map((s: any) => {
                                return (
                                  <div className="selected-size">
                                    {s.size}{" "}
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      onKeyDown={(ev: any) => {
                                        ev.key === "Enter" &&
                                          handleChangeSize(
                                            s.size,
                                            ev.target.value,
                                            e.id
                                          );
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )} */}
                          </div>
                          <div className="price">
                            {e.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                          <div className="quantity">
                            <input
                              type="number"
                              defaultValue={e.quantity}
                              value={isEdited ? quantityEdited : e.quantity}
                              onChange={(ev: any) => {
                                if (
                                  isEdited &&
                                  ev.target.value <=
                                    e.defaultOptions.sizes?.find(
                                      (s: any) =>
                                        s.size === e?.options?.sizes[0]?.size
                                    )?.quantity
                                ) {
                                  setQuantityEdited(ev.target.value);
                                } else {
                                  notifyError("Vượt quá số lượng có sẵn ");
                                  setQuantityEdited(1);
                                }
                              }}
                              readOnly={isEdited ? false : true}
                              autoFocus={isEdited ? true : false}
                              min={1}
                              max={
                                e.defaultOptions.sizes?.find(
                                  (s: any) => s.size === e.options.sizes[0].size
                                )?.quantity
                              }
                            />
                            {isEdited && (
                              <div className="avai">
                                Sẵn có :
                                <div className="value">
                                  {
                                    e.defaultOptions.sizes?.find(
                                      (s: any) =>
                                        s.size === e.options.sizes[0].size
                                    )?.quantity
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="sum">
                            {/* {isEdited
                              ? moneyFormater(
                                  e.price - e.price * e.discount * 100
                                )
                              : moneyFormater(totalEdited)} */}
                            <div className="real-value">
                              {moneyFormaterDong(
                                (e.price - (e.price * e.discount) / 100) *
                                  e.quantity
                              )}
                              <div className="discount">
                                {-e.discount + "%"}
                              </div>
                            </div>
                            <div className="origin-value">
                              {moneyFormater(e.price * e.quantity)}
                            </div>
                          </div>
                          <div className="assets">
                            <img
                              className="ava"
                              src={e?.img[0]}
                              alt="image_product"
                            />
                          </div>
                          <div className="actions">
                            <AiOutlineEdit
                              className={
                                isEdited ? "ic active edit" : "ic edit"
                              }
                              onClick={() => {
                                console.log(e);
                                !isEdited
                                  ? setItemEdited(e)
                                  : setItemEdited(null);
                              }}
                            />
                            <AiFillDelete
                              className="ic delete"
                              onClick={() => {
                                handleRemoveFromCart(e.productID, key);
                                handleRemoveFinalList(e);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-start">
            <div className="col-lg-4 mt-5 cart-wrap ftco-animate">
              <div className="cart-total mb-3">
                <h3>Tổng tiền </h3>
                <p></p>
                <p className="d-flex">
                  <span>Tạm tính</span>
                  <span>{moneyFormater(totalCost || 0)}</span>
                </p>
                <p className="d-flex">
                  <span>Phí vận chuyển</span>
                  <span>{moneyFormater(0)}</span>
                </p>
                <hr />
                <p className="d-flex total-price">
                  <span>Tổng cộng</span>
                  <span>{moneyFormater(totalCost || 0)}</span>
                </p>
              </div>
              <p>
                <div
                  className="btn btn-primary py-3 px-4"
                  onClick={() => createOrder()}
                >
                  Đặt hàng{" "}
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const sizes_mock = ["S", "M", "L", "XL", "XXL"];

export default CartInfo;
