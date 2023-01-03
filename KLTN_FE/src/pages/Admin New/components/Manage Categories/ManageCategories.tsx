import React from "react";
import { getAllUserAsync } from "../../../../apis/user/getAllUser.api";
import { getUserPagingAsync } from "../../../../apis/user/getUserPaging";
import { IUser } from "../../../../bussiness/user";
import "./ManageCategories.style.scss";
import { FaUnlock } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUserAdd, AiOutlineDelete } from "react-icons/ai";
import { MdExpandLess, MdExpandMore, MdDeleteForever } from "react-icons/md";
import { LockingButton } from "../../../../components/LockingButton/LockingButton";
import { UnLockingButton } from "../../../../components/UnLockingButton/UnLockingButton";
import { CreateUser } from "../popups/Create User/CreateUser";
import { lockUserAsync } from "../../../../apis/user/lockUser";
import { Spinner } from "react-bootstrap";
import { getListCategoryName } from "../../../../apis/category/listCategoryName";
import { getListByCategory } from "../../../../apis/category/listByCategory";
import { deleteCategory } from "../../../../apis/category/deleteCategory";
import { CreateCategory } from "../popups/Create Category/CreateCategory";
import { DeleteCategory } from "../popups/Delete Category/DeleteCategory";
import { removeVietnameseTones } from "../../../../utils/removeTiengViet";
import { listCategoryPaging } from "../../../../apis/category/listCategoryPaging";
export const ManageCategories = () => {
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [cateActive, setCateActive] = React.useState<any>();
  const [listProduct, setListProduct] = React.useState<any>();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreateCategory, setIsCreateCategory] = React.useState(false);
  const [isDeleteCategory, setIsDeleteCategory] = React.useState(false);

  const pageSize = 7;
  React.useEffect(() => {
    listCategoryPaging(0, pageSize, "asc").then((rs) => {
      setCategories(rs?.data?.content);
      setTotalPage(rs?.data?.totalPages);
    });
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, [currentPage]);
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
    getListByCategory(cateActive?.id).then((rs: any) =>
      setListProduct(rs?.data?.productsOfCategory)
    );
  }, [cateActive]);
  // console.log(categories);

  return (
    <div className="manage-categories-container">
      {isCreateCategory && (
        <CreateCategory setVisibility={setIsCreateCategory} />
      )}

      {isDeleteCategory && (
        <DeleteCategory
          setVisibility={setIsDeleteCategory}
          fn={deleteCategory}
          payload={cateActive?.id}
        />
      )}
      <div className="title-wrapper">
        <div className="title">Quản Lý Danh Mục </div>
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
                let tmp = categories.filter((t: any, key) => {
                  return removeVietnameseTones(t.title.toLowerCase()).includes(
                    e.target.value.toLowerCase()
                  );
                });
                setCategories([...tmp]);
              } else {
                getListCategoryName().then((rs) => {
                  setCategories(rs?.data);
                });
              }
            }}
          />
        </div>
        <div className="btns">
          <div
            className="add-customer"
            onClick={() => {
              setIsCreateCategory(true);
            }}
          >
            <AiOutlineUserAdd /> Thêm Danh Mục
          </div>
        </div>
      </div>
      {/* <div className="table-row table-head">
        <div className="stt">#</div>
        <div className="username">Name</div>
        <div className="phone">Phone</div>
        <div className="gmail">Gmail</div>
        <div className="avatar">Avatar</div>
        <div className="actions">Action</div>
      </div> */}
      <div className="w-100 d-flex justify-content-between mt-4 mb-4">
        <h6>Danh sách danh mục :</h6>

        <div className="total d-flex align-center ">
          <div className="mr-2">Tổng: </div>
          <div> {categories.length}</div>
          <div className="pagination">
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
                if (currentPage < totalPage - 1)
                  setCurrentPage(currentPage + 1);
              }}
            >
              {">"}
            </div>
          </div>
        </div>
      </div>

      {categories?.map((cate, item) => {
        return (
          <>
            <div
              className={cate === cateActive ? "category active" : "category"}
              id={cate === cateActive ? "cateActive" : ""}
            >
              <div className="cat-info">
                <div
                  className="name d-flex"
                  onClick={() => {
                    if (cate === cateActive) {
                      setCateActive({});
                    } else {
                      setCateActive(cate);
                    }
                  }}
                >
                  <div className="font-weight-bold cat-name">{cate?.title}</div>
                  <div className="id">{cate?.id}</div>
                </div>
                <div className="ic">
                  {cate === cateActive ? <MdExpandLess /> : <MdExpandMore />}
                  <MdDeleteForever
                    onClick={() => {
                      setIsDeleteCategory(true);
                    }}
                  />
                </div>
              </div>
              <div className="table-row-wrapper">
                {listProduct?.length > 0 && !isLoading ? (
                  listProduct?.map((pro: any, key: number) => {
                    return (
                      <div className="table-row " key={key}>
                        <div className="stt">
                          {currentPage * pageSize + key + 1}
                        </div>
                        <div className="name">{pro?.title}</div>
                        <div className="desc">
                          {pro?.descriptions[0]?.description}
                        </div>
                        <div className="origin">{pro?.origin}</div>
                        <div className="price">{pro?.price?.price}</div>
                        <img className="avatar" src={pro?.images[0]}></img>
                        {/* <div className="actions">
                          {pro?.enable ? (
                            // <div className="lock"></div>
                            <LockingButton
                              id={pro?.id}
                              lockFn={lockUserAsync}
                            />
                          ) : (
                            <UnLockingButton
                              id={pro?.id}
                              lockFn={lockUserAsync}
                            />
                          )}
                        </div> */}
                      </div>
                    );
                  })
                ) : (
                  <div className="loading">
                    {listProduct?.length === 0 ? (
                      "Không có sản phẩm nào!"
                    ) : (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Loading...
                      </>
                    )}
                  </div>
                )}
              </div>
              {/* <div className="pagination">
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
                    if (currentPage < totalPage - 1)
                      setCurrentPage(currentPage + 1);
                  }}
                >
                  {">"}
                </div>
              </div> */}
            </div>
          </>
        );
      })}
    </div>
  );
};
