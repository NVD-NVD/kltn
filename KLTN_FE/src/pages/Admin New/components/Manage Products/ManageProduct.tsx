import React from "react";
import "./ManageProduct.style.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { CreateProduct } from "../popups/Create Product/CreateProduct";
import { IProduct } from "../../../../bussiness/product";
import { getAllProductAsync } from "../../../../apis/product/getallproduct.api";
import { HiBadgeCheck } from "react-icons/hi";
import { notifyError } from "../../../../utils/notify";
import { EditProduct } from "../popups/Edit Product/EditProduct";
import { MdDeleteForever } from "react-icons/md";
import { LockingButton } from "../../../../components/LockingButton/LockingButton";
import { UnLockingButton } from "../../../../components/UnLockingButton/UnLockingButton";
import { lockProductAsync } from "../../../../apis/product/lockProduct.api";
import { getAllProductNoPagingAsync } from "../../../../apis/product/getallproductNoPaging.api";
import { removeVietnameseTones } from "../../../../utils/removeTiengViet";
export const ManageProduct = () => {
  const [isAddProduct, setIsAddProduct] = React.useState(false);
  const [products, setProducts] = React.useState<Array<IProduct>>([]);
  const [productsAll, setProductsAll] = React.useState<Array<IProduct>>([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isEditProduct, setIsEditProduct] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState<IProduct>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(7);

  React.useEffect(() => {
    getAllProductAsync({
      size: pageSize,
      page: currentPage,
    }).then((rs: any) => {
      if (rs) {
        setProducts(rs?.data?.content);
        setTotalPage(rs?.data?.totalPages);
        setTotalProducts(rs?.data?.totalElements);
      }
    });
    getAllProductNoPagingAsync().then((rs: any) => {
      setProductsAll(rs?.data);
    });
  }, []);

  console.log(productsAll);
  console.log(products);
  React.useEffect(() => {
    if (pageSize < 0) {
      setPageSize(7);
      return;
    }
    getAllProductAsync({
      size: pageSize,
      page: currentPage,
    }).then((rs: any) => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
      if (rs) {
        setProducts(rs?.data?.content);
        setTotalPage(rs?.data?.totalPages);
      }
    });
  }, [currentPage, pageSize]);
  return (
    <div className="manage-product-container">
      {isAddProduct && <CreateProduct setVisibility={setIsAddProduct} />}
      {isEditProduct && (
        <EditProduct setVisibility={setIsEditProduct} product={editProduct} />
      )}
      <div className="title-wrapper">
        <div className="title">Quản Lý Sản Phẩm </div>
      </div>
      <div className="top-action">
        <div className="search-container">
          <AiOutlineSearch className="ic" />
          <input
            type="text"
            className="search"
            placeholder="Tìm kiếm"
            onChange={(e: any) => {
              if (e.target.value !== "") {
                let lst = productsAll.filter((pro: any) =>
                  removeVietnameseTones(pro.title.toLowerCase()).includes(
                    e.target.value.toLowerCase()
                  )
                );
                setProducts([...lst]);
              } else {
              }
            }}
          />
        </div>
        <div className="btns">
          {/* <div className="delete-product">
            <TiDeleteOutline /> Xóa Sản Phẩm
          </div> */}
          <div
            className="add-product"
            onClick={() => {
              setIsAddProduct(true);
            }}
          >
            <MdProductionQuantityLimits /> Thêm Sản Phẩm
          </div>
        </div>
      </div>
      <div className="pagination">
        <div className="total d-flex">
          <div> Tổng : </div>
          <div>{totalProducts}</div>
        </div>
        <div className="pagination-wrapper">
          <div className="select-size">
            Size:
            <input
              type="number"
              value={pageSize}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  setPageSize(e.target.value);
                }
              }}
              onChange={(e: any) => setPageSize(e.target.value)}
            />
          </div>
          <div
            className="btn-change"
            onClick={() => {
              if (currentPage > 0) setCurrentPage(currentPage - 1);
            }}
          >
            {"<"}
          </div>
          {Array.from(Array(totalPage).keys()).map((item, key) => {
            return (
              <div
                className={currentPage === item ? "num active" : "num"}
                key={key}
                onClick={() => setCurrentPage(item)}
              >
                {item + 1}
              </div>
            );
          })}

          <div
            className="btn-change"
            onClick={() => {
              if (currentPage < totalPage - 1) setCurrentPage(currentPage + 1);
            }}
          >
            {">"}
          </div>
        </div>
      </div>
      <div className="products">
        {products?.length > 0 && !isLoading ? (
          products?.map((item: any, key) => {
            return (
              <div className="product" key={key}>
                <div className="ava">
                  <img src={item?.images[0]} alt="ava" />
                </div>
                <div className="title">{item?.title}</div>
                <div className="desc">{item?.descriptions[0].description}</div>
                <div className="stat">
                  <div className="price">
                    <div className="lb">Price:</div>
                    {item?.price.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div className="quantity">
                    <div className="lb">Quantity:</div>
                    {item?.quantity}
                  </div>
                </div>
                <div className="actions">
                  <div
                    className="action edit"
                    onClick={() => {
                      setIsEditProduct(true);
                      setEditProduct(item);
                    }}
                  >
                    <FaEdit className="ic" />
                  </div>
                  {item?.enable ? (
                    <div className="action">
                      <LockingButton
                        txt={""}
                        id={item?.id}
                        lockFn={lockProductAsync}
                      />
                    </div>
                  ) : (
                    <div className="action">
                      <UnLockingButton
                        txt={""}
                        id={item?.id}
                        lockFn={lockProductAsync}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <span className="spinner-border spinner-border-sm"></span>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};
