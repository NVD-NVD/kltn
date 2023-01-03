import React from "react";
import { IoIosCart } from "react-icons/io";
import { HiOutlineHeart } from "react-icons/hi";
import { moneyFormater } from "../../utils/moneyFormater";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { IProduct } from "../../bussiness/product";
import { handleAddToCart } from "../../utils/cart";

interface IProps {
  book: IProduct;
}
import "./style.scss";
import { notifyError } from "../../utils/notify";

const CardProduct = ({ book }: IProps) => {
  const history = useHistory();

  const handleClickSingleProduct = (id: string) => {
    history.push(`/singleproduct/${id}`);
    // window.location.reload();
  };
  return (
    <div
      className="product"
      onClick={() => {
        history.push(`/singleproduct/${book.id}`);
        window.scrollTo(0, 0);
      }}
    >
      <img
        className="img-fluid"
        src={book?.images[0]}
        alt="Colorlib Template"
      />
      {!book?.enable && <div className="disable">Sản phẩm hết hàng</div>}

      <div className="bottom">
        <div className="name">{book.title}</div>
        <div className="desc">{book.descriptions[0].description}</div>
        <div className="price">
          <div className="value">
            <div className="pr">
              {book.price.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          {book.discount > 0 && (
            <div className="discount">-{book.discount} %</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
