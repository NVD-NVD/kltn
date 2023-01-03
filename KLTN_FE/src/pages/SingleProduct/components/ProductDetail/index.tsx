import React, { useState } from "react";
import { useHistory } from "react-router";
import { createCartAsync } from "../../../../apis/cart/createcart.api";
import { getDetailProductAsync } from "../../../../apis/product/getdetailproduct.api";
import { IProduct } from "../../../../bussiness/product";
import { handleAddToCart } from "../../../../utils/cart";
import { moneyFormater } from "../../../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
const ProductDetail = (props: { id: string }) => {
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = React.useState<any>();
  const [size, setSize] = React.useState<any>();
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const result = await getDetailProductAsync({
        id: props?.id,
      });

      const { data } = result;

      setProduct(data);
    })();
  }, [props?.id]);
  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const result = await getDetailProductAsync({
        id: props?.id,
      });

      const { data } = result;
      console.log(data);

      setProduct(data);
      setColor(data?.options.color[0]);
      setSize(data?.options.sizes[0]);
    })();
  }, []);

  const renderImage = (image?: Array<string>) => {
    console.log("renderImage", image);
    if (typeof image === "undefined") return "";
    return image[0];
  };
  React.useEffect(() => {
    if (
      quantity >
      product?.options.sizes.find((e: any) => e.size === size.size)?.quantity
    ) {
      notifyError("Vượt quá số lượng đang có");
    }
  }, [quantity]);
  return (
    <div>
      <section className="ftco-section">
        <div className="container single-product">
          <div className="left">
            <img src={product?.images[0]} alt="product image" />
            {!product?.enable && <div className="lock">Hết hàng</div>}
          </div>
          <div className="right">
            <div className="name">{product?.title}</div>
            <div className="desc">{product?.descriptions[0].description}</div>
            <div className="line"></div>
            <div className="price">
              {product?.discount > 0 && (
                <div className="discount">-{product?.discount}%</div>
              )}
              <div className="value">
                {(
                  product?.price?.price -
                  (product?.discount * product?.price?.price) / 100
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              {product?.discount > 0 && (
                <div className="origin-value">
                  {(product?.price?.price).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              )}
            </div>
            <div className="line"></div>

            <div className="colors">
              <span> Màu sắc:</span>
              {product?.options.color.map((c: any) => (
                <div
                  className={color === c ? "color active" : " color"}
                  onClick={() => setColor(c)}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="line"></div>

            <div className="sizes">
              <span> Sizes:</span>
              {product?.options.sizes.map((c: any) => (
                <div
                  onClick={() =>
                    setSize({
                      size: c.size,
                      quantity: quantity,
                    })
                  }
                >
                  <div
                    className={size?.size === c.size ? "size active" : "size"}
                  >
                    {c.size}
                  </div>
                  <div className="avai">Sẵn có: {c.quantity}</div>
                </div>
              ))}
            </div>
            <div className="line"></div>

            <div className="quan">
              <span> Số lượng:</span>
              <input
                type="number"
                name=""
                id=""
                defaultValue={quantity}
                onChange={(e: any) => setQuantity(e.target.value)}
                min={1}
                max={
                  size &&
                  product?.options.sizes.find((e: any) => e.size === size.size)
                    ?.quantity
                }
              />
            </div>

            {product?.enable ? (
              <div
                className="buy"
                onClick={() => {
                  if (color && size && quantity) {
                    if (
                      quantity >
                        product?.options?.sizes?.find(
                          (e: any) => e?.size === size?.size
                        )?.quantity ||
                      quantity < 0
                    ) {
                      notifyError("Số lượng không hợp lệ");
                      return;
                    }
                    history.push("/cart");
                    handleAddToCart({
                      options: {
                        color: [color],
                        features: [""],
                        sizes: [size],
                      },
                      productID: props.id,
                      quantity: quantity,
                      title: product?.title,
                      price: product?.price.price,
                      discount: product?.discount,
                      img: product?.images,
                      defaultOptions: {
                        color: product?.options.color,
                        features: [""],
                        sizes: product?.options.sizes,
                      },
                    });
                  } else {
                    notifyError("Hãy chọn đầy đủ size, màu và số lượng ");
                  }
                }}
              >
                Thêm vào giỏ hàng
              </div>
            ) : (
              <div
                className="buy disable"
                onClick={() => {
                  notifyError("Sản phẩm này hiện không có sẵn");
                }}
              >
                Thêm vào giỏ hàng
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
