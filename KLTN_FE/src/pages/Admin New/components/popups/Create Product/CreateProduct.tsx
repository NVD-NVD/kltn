import "./CreateProduct.style.scss";
import { GrFormAdd } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import React from "react";
import { useEffect } from "react";
import { getListCategoryName } from "../../../../../apis/category/listCategoryName";
import { addNewProductAsync } from "../../../../../apis/product/addNewProduct.api";
import Temp from "../../../../HomePage/components/temp";
import { ButtonSpinner } from "../../../../../components/ButtonSpinner";
import { notifyError } from "../../../../../utils/notify";
const size_mock = ["S", "M", "L", "XL", "XXL"];
export const CreateProduct = ({ setVisibility }: any) => {
  const [colors, setColors] = React.useState<Array<string>>([]);
  const [sizes, setSizes] = React.useState<Array<any>>([]);
  const [quantiy, setQuantity] = React.useState<number>(0);
  const [quantityForEachSize, setQuantityForEachSize] =
    React.useState<number>(1);
  const [title, setTitle] = React.useState();
  const [desc, setDesc] = React.useState();
  const [discount, setDiscount] = React.useState(0);
  const [price, setPrice] = React.useState();
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [category, setCategory] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [img, setImg] = React.useState<any>();
  useEffect(() => {
    getListCategoryName().then((rs: any) => {
      setCategory(rs?.data[0]?.title);
      setCategories(rs?.data);
    });
  }, []);
  const addProduct = () => {
    let isBadQuantity = sizes.find((i: any) => {
      return i.quantity < 1;
    });
    if (isBadQuantity) {
      console.log(isBadQuantity);
      notifyError("Số lượng không hợp lệ (< 0)");
      return;
    }
    let productData: any = {
      title: title,
      descriptions: [
        {
          description: desc,
          language: "vi",
        },
      ],
      discount: discount,
      enable: true,
      fallIntoCategories: [
        {
          id: categories.find((item) => item.title === category).id,
          title: category,
        },
      ],
      options: {
        color: colors,
        sizes: sizes,
      },
      quantity: quantiy,
      price: {
        price: price,
        currency: "VND",
      },
    };
    const formData = new FormData();
    const json = JSON.stringify(productData);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("productDto", blob);
    for (let i = 0; i < img?.length; i++) {
      formData.append("files", img[i]);
    }
    addNewProductAsync(formData);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <div className="create-product">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <div className="title">Thêm mới sản phẩm</div>
        <div className="field">
          <div className="label">
            Tiêu đề : <div className="require"> *</div>
          </div>
          <input
            type="text"
            placeholder="Nhập tiêu đề"
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>
        <div className="field desc">
          <div className="label">Mô tả :</div>
          <textarea
            name=""
            id=""
            cols={30}
            rows={5}
            onChange={(e: any) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="field">
          <div className="label"> Màu :</div>
          <div className="add-wrapper">
            {colors.length > 0 ? (
              <div className="colors">
                {colors?.map((item, key) => {
                  return (
                    <div className="color" key={key}>
                      <div
                        className="close"
                        onClick={() => {
                          let temp = colors.filter((it) => !it.includes(item));
                          setColors(temp);
                        }}
                      >
                        <IoIosCloseCircle />
                      </div>
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ color: "rgb(1,1, 1,0.4)", fontSize: "13px" }}>
                Thêm màu...
              </div>
            )}
            <input
              type="text"
              placeholder="color"
              id="ip-add-color"
              onFocus={(e) => e.target.select()}
              onKeyPress={(e: any) => {
                const ip = document.querySelector(
                  "#ip-add-color"
                ) as HTMLElement;
                if (e.key === "Enter") {
                  console.log(e.target.value);
                  ip.style.display = "none";
                  if (e.target.value !== "") {
                    let temp = colors;
                    temp.push(e.target.value);
                    setColors([...temp]);
                  }
                }
              }}
            />{" "}
            <div
              className="btn-add"
              onClick={() => {
                const ip = document.querySelector(
                  "#ip-add-color"
                ) as HTMLElement;
                ip.style.display = "flex";
                ip.focus();
              }}
            >
              <GrFormAdd />
            </div>
          </div>
        </div>

        <div className="field">
          <div className="label">Sizes :</div>
          <div className="sizes">
            {size_mock?.map((item, key) => {
              const isContained = sizes.find((it) => it.size === item);
              return (
                <div
                  className={isContained ? "size checked" : "size"}
                  key={key}
                  onClick={() => {
                    if (isContained) {
                      console.log("contained");
                      let tmp = sizes.filter((it) => it.size !== item);
                      setSizes([...tmp]);
                    } else {
                      let tmp = sizes;
                      tmp.push({
                        size: item,
                        quantity: 0,
                      });
                      setSizes([...tmp]);
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <div className="field">
          <div className="label"> </div>
          <div className="sizes">
            {sizes?.map((item: any, key: any) => {
              return (
                <div className="quantity" key={key}>
                  {item.size}
                  <input
                    type="number"
                    name=""
                    id=""
                    min={1}
                    placeholder={item.quantity}
                    onChange={(e: any) => {
                      // setQuantityForEachSize(e.target.value);
                      if (e.target.value < 0) {
                        e.target.value = 1;
                      }
                      let newsize = {
                        size: item.size,
                        quantity: Number(e.target.value),
                      };

                      let totalQuantity = 0;
                      const i = sizes
                        ?.map((s: any) => s.size)
                        .indexOf(item.size);

                      if (i !== -1) sizes[i] = newsize;
                      sizes?.map((s: any) => {
                        totalQuantity += s.quantity;
                      });

                      setQuantity(totalQuantity);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="field">
          <div className="label"> </div>
          <div className="txt">Tổng :</div>
          <div className="total">{quantiy}</div>
        </div>
        <div className="field">
          <div className="label">Giảm giá : </div>
          <div className="tool">
            <div
              className="btn-des"
              onClick={() => {
                if (discount > 0) {
                  setDiscount(discount - 10);
                } else {
                  notifyError("Giảm giá không nhỏ hơn 0% ");
                }
              }}
            >
              -
            </div>
            <div className="num">{discount}</div>
            <div
              className="btn-ins"
              onClick={() => {
                if (discount < 100) {
                  setDiscount(discount + 10);
                } else {
                  notifyError("Giảm giá không lớn hơn 100% ");
                }
              }}
            >
              +
            </div>
          </div>
          <div>%</div>
        </div>
        <div className="field">
          <div className="label">Danh mục : </div>
          <select
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
          >
            {categories?.map((item, key) => {
              return <option value={item.title}>{item.title}</option>;
            })}
          </select>
        </div>

        <div className="field">
          {" "}
          <div className="label"> Giá : </div>
          <input
            type="number"
            onChange={(e: any) => setPrice(e.target.value)}
          />
          <div>VND</div>
        </div>
        <div className="field">
          <div className="label"> Ảnh : </div>
          <input
            type="file"
            multiple
            onChange={(e: any) => {
              setImg(e.target.files);
            }}
          />
        </div>
        <div className="btns">
          <div className="btn cancel" onClick={() => setVisibility(false)}>
            Hủy
          </div>
          <div className="btn add" onClick={() => addProduct()}>
            {isLoading ? <ButtonSpinner /> : "Thêm"}
          </div>
        </div>
      </div>
    </div>
  );
};
