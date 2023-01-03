import { GrFormAdd } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { SignUp } from "../../../../SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import "./EditProduct.style.scss";
import { signUpSchema } from "../../../../../validate/auth";
import { registerAsync } from "../../../../../apis/auths/register.api";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../../utils/notify";
import { createNewAdminAsync } from "../../../../../apis/user/createNewAdmin.api";
import { createNewUserAsync } from "../../../../../apis/user/createNewUser.api";
import React from "react";
import { getListCategoryName } from "../../../../../apis/category/listCategoryName";
import { editProduct } from "../../../../../apis/product/editProduct.api";
import { Spinner } from "react-bootstrap";
import { ButtonSpinner } from "../../../../../components/ButtonSpinner";
const size_mock = ["S", "M", "L", "XL", "XXL"];
export const EditProduct = ({ setVisibility, product }: any) => {
  const [colors, setColors] = React.useState<Array<string>>(
    product.options.color
  );
  const [sizes, setSizes] = React.useState(product.options.sizes);
  const [quantiy, setQuantity] = React.useState(product.quantity);
  const [title, setTitle] = React.useState(product.title);
  const [desc, setDesc] = React.useState(product.descriptions[0].description);
  const [discount, setDiscount] = React.useState(product.discount);
  const [price, setPrice] = React.useState(product.price.price);
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [category, setCategory] = React.useState();
  const [img, setImg] = React.useState<any>();
  // const [imgFiles, setImgFiles] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(colors);
  React.useEffect(() => {
    setCategory(product.fallIntoCategories[0]?.title);
    getListCategoryName().then((rs: any) => {
      setCategories(rs?.data);
    });
  }, []);
  const handleEditProduct = () => {
    if (
      sizes?.find((s: any) => {
        return s.quantity < 0;
      })
    ) {
      notifyError("Số lượng không hợp lệ!");
      return;
    }
    let productData: any = {
      id: product.id,
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
          id: categories.find((item) => item.title === category)?.id,
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
    const productJson = JSON.stringify(productData);
    const blobProduct = new Blob([productJson], {
      type: "application/json",
    });
    const blobImage = new Blob([img], {
      type: "multipart/form-data",
    });
    formData.append("dto", blobProduct);
    for (let i = 0; i < img?.length; i++) {
      formData.append("files", img[i]);
    }
    editProduct(formData, product.id);
    setTimeout(() => setIsLoading(false), 1000);
  };
  // React.useEffect(() => {
  //   const imgStored = JSON.parse(localStorage.getItem(product.id));
  //   setImg(imgStored);
  // }, []);
  // React.useEffect(() => {
  //   console.log("blob", imgFiles);
  // }, [imgFiles]);

  return (
    <div className="edit-product">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <div className="title">Sửa sản phẩm</div>
        <div className="field">
          <div className="label">Tiêu đề :</div>
          <input
            type="text"
            placeholder="Nhập tiêu đề"
            value={title}
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
          >
            {desc}
          </textarea>
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
              const isContained = sizes?.find(
                (it: any, key: any) => it.size === item
              );
              return (
                <div
                  className={isContained ? "size checked" : "size"}
                  key={key}
                  onClick={() => {
                    if (isContained) {
                      let tmp = sizes.filter((it: any) => it.size !== item);
                      setSizes([...tmp]);
                    } else {
                      let tmp = sizes;
                      tmp.push({
                        size: item,
                        quantity: Number(
                          product.options.sizes.find(
                            (it: any) => it.size === item
                          )?.quantity || 0
                        ),
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
          <div className="label"> Số lượng cho mỗi size : </div>
          <div className="sizes">
            {sizes?.map((item: any, key: any) => {
              return (
                <div className="quantity" key={key}>
                  {item.size}
                  <input
                    min={1}
                    type="number"
                    name=""
                    id=""
                    placeholder={item.quantity}
                    onChange={(e: any) => {
                      let newsize = {
                        size: item.size,
                        quantity: Number(e.target.value),
                      };

                      let totalQuantity = 0;
                      console.log("before edited sizes ", sizes);
                      const i = sizes
                        ?.map((s: any) => s.size)
                        .indexOf(item.size);
                      console.log(i);

                      if (i !== -1) sizes[i] = newsize;
                      console.log("after edited sizes ", sizes);
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
            value={price}
          />
          <div>VND</div>
        </div>
        <div className="field">
          <div className="label"> Ảnh : </div>
          <input
            type="file"
            id="imgs_select"
            multiple
            onChange={(e: any) => {
              let array_img = Array.from(e.target.files);
              let array_img_url = array_img.map((img: any) => {
                return URL.createObjectURL(img);
              });
              localStorage.setItem(product.id, JSON.stringify(array_img_url));
              localStorage.setItem(product.id + "_files", e.target.files);
              setImg(e.target.files);
            }}
          />
        </div>
        {/* {img?.length > 0 && (
          <div className="field">
            <div className="label"> </div>
            <div className="preview-wrapper">
              <div
                className="delete-all"
                onClick={() => {
                  const ele = document.querySelector(
                    "#imgs_select"
                  ) as HTMLElement;
                  ele.
                }}
              >
                x
              </div>
              {img?.length > 0 &&
                img?.map((i: any) => {
                  return <img src={i} />;
                })}
            </div>
          </div>
        )} */}
        <div className="btns">
          <div className="btn cancel" onClick={() => setVisibility(false)}>
            Hủy
          </div>
          <div
            className="btn add"
            onClick={() => {
              setIsLoading(true);
              handleEditProduct();
            }}
          >
            {isLoading ? <ButtonSpinner /> : "Sửa"}
          </div>
        </div>
      </div>
    </div>
  );
};
