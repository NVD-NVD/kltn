import React, { useRef } from "react";
import { getAllUserAsync } from "../../../../apis/user/getAllUser.api";
import { getUserPagingAsync } from "../../../../apis/user/getUserPaging";
import { IUser } from "../../../../bussiness/user";
import "./ManageAdmins.style.scss";
import { FaUnlock } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LockingButton } from "../../../../components/LockingButton/LockingButton";
import { UnLockingButton } from "../../../../components/UnLockingButton/UnLockingButton";
import { CreateUser } from "../popups/Create User/CreateUser";
import { lockUserAsync } from "../../../../apis/user/lockUser";
import { Spinner } from "react-bootstrap";
export const ManageAdmins = () => {
  const [admins, setAdmins] = React.useState<Array<IUser>>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalUser, setTotalUser] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreateUser, setIsCreateUser] = React.useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = React.useState(false);
  const pageSize = 7;
  const myRef = useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    getAllUserAsync().then((rs: any) => {
      const lst = rs?.data;
      let templst = lst?.filter((item: any) => {
        return item.roles?.includes("ROLE_ADMIN");
      });
      setAdmins([...templst]);
      setTotalPage(Math.ceil(templst.length / pageSize));
      setTotalUser(lst.length);
    });
  }, []);
  console.log(admins);
  console.log(totalPage);

  React.useEffect(() => {
    // getUserPagingAsync(currentPage, pageSize).then((rs) => {
    //   setAdmins(rs?.data?.content);
    //   setTotalPage(rs?.data?.totalPages);
    // });
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, [currentPage]);

  return (
    <div className="manage-admins-container">
      {isCreateAdmin && (
        <CreateUser setVisibility={setIsCreateAdmin} type={"admin"} />
      )}
      <div className="title-wrapper">
        <div
          className="title"
          onClick={() => {
            myRef?.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
            console.log(myRef);
          }}
        >
          Quản Lý Khách Hàng{" "}
        </div>
        <div className="total">
          <div> Tổng : </div>
          <div>{totalUser}</div>
        </div>
      </div>
      <div className="top-action justify-content-end w-100">
        {/* <div className="search-container">
          <AiOutlineSearch className="ic" />
          <input type="text" className="search" placeholder="Tìm kiếm" />
        </div> */}
        <div className="btns">
          <div
            className="add-customer admin"
            onClick={() => {
              setIsCreateAdmin(true);
            }}
          >
            <AiOutlineUserAdd /> Thêm Admin
          </div>
        </div>
      </div>
      <div className="pagination" ref={myRef}>
        <div className="total d-flex">
          <div> Tổng : </div>
          <div>{totalUser}</div>
        </div>
        <div className="pagination-wrapper">
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
      <div className="table-row table-head">
        <div className="stt">#</div>
        <div className="username">Tên</div>
        <div className="phone">Số điện thoại </div>
        <div className="gmail">Gmail</div>
        <div className="avatar">Ảnh </div>
        <div className="actions">Khóa </div>
      </div>

      <div className="table-row-wrapper">
        {admins?.length > 0 && !isLoading ? (
          admins
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            ?.map((user, key) => {
              return (
                <div className="table-row " key={key}>
                  <div className="stt">{currentPage * pageSize + key + 1}</div>
                  <div className="username">{user?.name}</div>
                  <div className="phone">{user?.phone}</div>
                  <div className="gmail">{user?.email}</div>
                  <img className="avatar" src={user?.avatar}></img>
                  <div className="actions">
                    {user?.enable ? (
                      // <div className="lock"></div>
                      <LockingButton id={user?.id} lockFn={lockUserAsync} />
                    ) : (
                      <UnLockingButton id={user?.id} lockFn={lockUserAsync} />
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
