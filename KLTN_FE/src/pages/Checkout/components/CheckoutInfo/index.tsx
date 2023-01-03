import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getInfoAsync } from "../../../../apis/auths/getInfo.api";
import { checkoutCart } from "../../../../apis/cart/checkout.api";
import { getAllCartAsync } from "../../../../apis/cart/getallcart.api";
import { createOrderAsync } from "../../../../apis/order/createOrder.api";
import { SelectCustom } from "../../../../components/Select";
import { IProductCart } from "../../../../utils/cart";
import {
  CART_KEY,
  getLocalStorage,
  setLocalStorage,
} from "../../../../utils/localStorage";
import {
  moneyFormater,
  moneyFormaterDong,
} from "../../../../utils/moneyFormater";
import "./style.scss";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import { AddressPicker } from "./AddressPicker/AddressPicker";
import { createPaymentAsync } from "../../../../apis/payment/payment.api";

interface Props {}

const CheckoutInfo = (props: Props) => {
  const [cartList, setCartList] = useState<IProductCart[]>([]);
  const [address, setAddress] = useState<any>({
    cities: [],
    districts: [],
    wards: [],
    city: null,
    district: null,
    ward: null,
    detail: null,
  });
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>({ name: null, phone: null });
  const [paymentMethod, setPaymentMethod] = useState<any>("");
  console.log(paymentMethod);

  React.useEffect(() => {
    const order = getLocalStorage("order");
    if (!order) return;
    setCartList(JSON.parse(order) as IProductCart[]);
  }, []);

  const handleCheckoutCart = async () => {
    if (
      address.city &&
      address.district &&
      address.ward &&
      address.detail &&
      userInfo.name &&
      userInfo.phone
    ) {
      const order = {
        addressForShipping: {
          city: address.city.label,
          country: "Việt Nam",
          district: address.district.label,
          number: "",
          street: "",
          ward: address.ward.label,
        },
        note: "",
        phone: userInfo?.phone,
        productsInOrder: cartList.map((pro: IProductCart) => {
          return {
            options: pro.options,
            productID: pro.productID,
            quantity: pro.quantity,
          };
        }),
      };
      if (paymentMethod === "VNPAY") {
        createOrderAsync(order).then((rs) => {
          if (rs && rs.data) {
            console.log(rs);
            createPaymentAsync({
              orderID: rs?.data?.id,
              url_return: "https://sportswear-be.herokuapp.com/",
            }).then((rs) => {
              window.open(rs?.data?.url, "_self");
              // notifySuccess("Thanh toán thành công, đơn hàng đã được đặt");
              history.push("/order");
            });
          }
        });
        let cart = JSON.parse(getLocalStorage("cart"));
        for (let i = 0; i < cartList.length; i++) {
          for (let j = 0; j < cart.length; j++) {
            if (
              cartList[i].productID === cart[j].productID &&
              cartList[i].options.color[0] === cart[j].options.color[0] &&
              cartList[i].options.sizes[0].size ===
                cart[j].options.sizes[0].size
            ) {
              cart.splice(j, 1);
            }
          }
        }
        setLocalStorage("cart", cart);
      }
      if (paymentMethod === "COD") {
        createOrderAsync(order).then((rs) => {
          if (rs && rs.data) {
            console.log(rs);
            notifySuccess("Đơn hàng đã được đặt");
            history.push("/order");
          }
        });
        let cart = JSON.parse(getLocalStorage("cart"));
        for (let i = 0; i < cartList.length; i++) {
          for (let j = 0; j < cart.length; j++) {
            if (
              cartList[i].productID === cart[j].productID &&
              cartList[i].options.color[0] === cart[j].options.color[0] &&
              cartList[i].options.sizes[0].size ===
                cart[j].options.sizes[0].size
            ) {
              cart.splice(j, 1);
            }
          }
        }
        setLocalStorage("cart", cart);
      }
    } else {
      notifyError("Địa chỉ / thông tin giao hàng chưa đầy đủ");
    }
  };

  const totalCost =
    cartList.length > 0 &&
    cartList.reduce(
      (prev: any, current: any) =>
        prev +
        (current.price - (current.price * current.discount) / 100) *
          current.quantity,
      0
    );
  const totalDiscount =
    cartList.length > 0 &&
    cartList.reduce(
      (prev: any, current: any) =>
        prev + ((current.price * current.discount) / 100) * current.quantity,
      0
    );

  return (
    <div>
      <section className="ftco-section " style={{ padding: "60px 20px" }}>
        <h3 className="mb-4 billing-heading">Chi tiết hóa đơn</h3>
        <div className="containerr">
          <div className="right">
            <div className="tablee">
              <div className="table-row table-head">
                <div className="assets">Hình ảnh</div>
                <div className="name">Tên sản phẩm</div>
                <div className="colors">Màu sắc</div>
                <div className="sizes-wrapper checkout">Size</div>
                <div className="price">Giá</div>
                <div className="quantity">Số lượng</div>
                <div className="sum">Tổng tiền</div>
              </div>
              {cartList.length > 0 &&
                cartList?.map((e: IProductCart, key: any) => {
                  return (
                    <div className={"table-row"} key={key}>
                      <div className="assets">
                        <img
                          className="ava"
                          src={e?.img[0]}
                          alt="image_product"
                        />
                      </div>
                      <div className="name">{e?.title}</div>
                      <div className="colors">
                        {e?.options?.color?.map((c: any) => (
                          <div className="color">{c}</div>
                        ))}
                      </div>
                      <div className="sizes-wrapper checkout">
                        <div
                          className="sizes"
                          onClick={() => {
                            // handleChangeSize(s.size, e.id);
                          }}
                        >
                          <div className="size">{e.options.sizes[0]?.size}</div>
                        </div>
                      </div>
                      <div className="price">
                        {e.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div className="quantity">{e.quantity}</div>
                      <div className="sum">
                        <div className="real-value">
                          {moneyFormaterDong(
                            (e.price - (e.price * e.discount) / 100) *
                              e.quantity
                          )}
                          <div className="discount">{-e.discount + "%"}</div>
                        </div>
                        <div className="origin-value">
                          {moneyFormater(e.price * e.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="left">
            <div className="col align-items-end">
              <div className="form-group">
                <label>Địa chỉ giao hàng</label>
                <AddressPicker
                  address={address}
                  setAddress={setAddress}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                />
              </div>
            </div>
            <div className="payment">
              <h3 className="billing-heading mb-4">Phương thức thanh toán</h3>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="radio">
                    {payments?.map((p: any) => {
                      return (
                        <div
                          className="option"
                          onClick={() => {
                            setPaymentMethod(p.value);
                          }}
                        >
                          <input
                            type="radio"
                            name="optradio"
                            className="mr-2"
                            value={p.value}
                            checked={paymentMethod === p.value}
                            onChange={(e: any) => {
                              setPaymentMethod(e.target.value);
                            }}
                          />
                          <label htmlFor="">{p.txt}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={paymentMethod ? true : false}
                          onClick={() => setPaymentMethod(null)}
                        />{" "}
                        Tôi đã đọc và đồng ý điều khoản dịch vụ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="total">
              <h3 className="billing-heading mb-4">Tổng tiền</h3>
              <p className="d-flex total-discount">
                <span>Giảm giá :</span>
                <span>{moneyFormater(totalDiscount)}</span>
              </p>
              <p className="d-flex total-discount">
                <span>Phí vận chuyển :</span>
                <span>{moneyFormater(0)}</span>
              </p>

              <hr />
              <p className="d-flex total-price ">
                <span>Tổng cộng</span>
                <span>{moneyFormater(totalCost)}</span>
              </p>
              <p className="d-flex pay">
                {paymentMethod === "COD" && (
                  <button
                    onClick={() => handleCheckoutCart()}
                    className="btn btn-primary py-3 px-4 btn-COD"
                  >
                    Mua hàng
                  </button>
                )}
                {paymentMethod === "VNPAY" && (
                  <button
                    onClick={() => handleCheckoutCart()}
                    className="btn btn-primary py-3 px-4 btn-vnpay"
                  >
                    Thanh toán
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const payments = [
  {
    txt: "COD",
    value: "COD",
  },
  {
    txt: "VNPAY",
    value: "VNPAY",
  },
];

export default CheckoutInfo;
