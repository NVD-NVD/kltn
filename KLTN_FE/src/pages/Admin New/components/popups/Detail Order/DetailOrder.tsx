import React from "react";
import { getDetailOrderAsync } from "../../../../../apis/order/getDetailOrder.api";
import { moneyFormaterDong } from "../../../../../utils/moneyFormater";
import "./style.scss";
export const DetailOrder = ({ setVisibility, id }: any) => {
  const [order, setOrder] = React.useState<any>();
  React.useEffect(() => {
    getDetailOrderAsync(id).then((rs) => {
      if (rs && rs?.data) {
        setOrder(rs?.data);
      }
    });
  }, []);
  return (
    <div className="detail-container">
      <div className="bg" onClick={() => setVisibility(false)}></div>
      <div className="content">
        <div className="left">
          <div className="user-info">
            <div className="tl">Thông tin người dùng</div>
            <div className="phone">
              <div className="lb">Số điện thoại:</div>
              {order?.user?.phone}
            </div>
            <div className="email">
              <div className="lb">Email:</div>
              {order?.user?.email}
            </div>
            <div className="name">
              <div className="lb">Tên:</div>

              {order?.user?.name}
            </div>
          </div>
          {/* <div className="trans-info">
            <div className="tl">Thông tin thanh toán</div>
            <div className="bankCode">
              <div className="lb">Ngân Hàng: </div>
              {trans?.bankCode}
            </div>
            <div className="bankTranNo"> {trans?.bankTranNo}</div>
            <div className="cardType">
              <div className="lb"> Loại : </div> {trans?.cardType}
            </div>
            <div className="payDate">
              <div className="lb"> Ngày thực hiện : </div> {trans?.createdOn}
            </div>
          </div> */}
        </div>
        <div className="right-area">
          <div className="tl">Thông tin đơn hàng </div>
          <div className="order-info">
            <div className="list-product">
              {order?.productsInOrder?.map((p: any) => {
                console.log(p);
                return (
                  <div className="pro">
                    <div className="left">
                      <img
                        src={p?.product?.images[0]}
                        alt="image-product"
                        className="ava"
                      />
                      <div className="inf">
                        <div className="name">{p?.product.title}</div>
                        <div className="quan">x{p?.quantity}</div>
                        <div className="name">{p?.options?.sizes[0].size}</div>
                        <div className="name">{p?.options?.color[0]}</div>
                      </div>
                    </div>

                    <div className="righ">
                      <div className="price">
                        Giá: {moneyFormaterDong(p?.total)}
                      </div>
                      <div className="discount">
                        Giảm giá: {moneyFormaterDong(p?.discount)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
