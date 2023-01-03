import React, { useRef } from "react";
import { getAllUserAsync } from "../../../../apis/user/getAllUser.api";
import { getUserPagingAsync } from "../../../../apis/user/getUserPaging";
import { IUser } from "../../../../bussiness/user";
import "./ManageUser.style.scss";
import { FaUnlock } from "react-icons/fa";
import { AiOutlineSearch, AiFillEdit } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LockingButton } from "../../../../components/LockingButton/LockingButton";
import { UnLockingButton } from "../../../../components/UnLockingButton/UnLockingButton";
import { CreateUser } from "../popups/Create User/CreateUser";
import { lockUserAsync } from "../../../../apis/user/lockUser";
import { Spinner } from "react-bootstrap";
import { removeVietnameseTones } from "../../../../utils/removeTiengViet";
import { notifyError } from "../../../../utils/notify";
import { EditUser } from "../popups/Edit User/EditUser";
export const ManageUser = () => {
  const [users, setUsers] = React.useState<Array<IUser>>([]);
  const [usersAll, setUsersAll] = React.useState<Array<IUser>>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalUser, setTotalUser] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreateUser, setIsCreateUser] = React.useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = React.useState(false);
  const [isEditUser, setIsEditUser] = React.useState(false);
  const [editedUser, setIsEditedUser] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(7);

  const myRef = useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    getUserPagingAsync(currentPage, pageSize).then((rs) => {
      setUsers(rs?.data?.content);
      setTotalPage(rs?.data?.totalPages);
      setTotalUser(rs?.data?.totalElements);
    });
    getAllUserAsync().then((rs: any) => setUsersAll(rs?.data));
  }, []);
  React.useEffect(() => {
    if (pageSize < 0) {
      setPageSize(7);
      return;
    }
    getUserPagingAsync(currentPage, pageSize).then((rs) => {
      setUsers(rs?.data?.content);
      setTotalPage(rs?.data?.totalPages);
    });
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, [currentPage, pageSize]);

  return (
    <div className="manage-user-container">
      {isCreateUser && (
        <CreateUser setVisibility={setIsCreateUser} type={"user"} />
      )}
      {isCreateAdmin && (
        <CreateUser setVisibility={setIsCreateAdmin} type={"admin"} />
      )}
      {isEditUser && (
        <EditUser setVisibility={setIsEditUser} user={editedUser} />
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
                let lst = usersAll?.filter((us: any) =>
                  removeVietnameseTones(us.name.toLowerCase()).includes(
                    e.target.value.toLowerCase()
                  )
                );
                setUsers(lst);
              }
            }}
          />
        </div>

        <div className="btns">
          <div
            className="add-customer"
            onClick={() => {
              setIsCreateUser(true);
            }}
          >
            <AiOutlineUserAdd /> Thêm Khách Hàng
          </div>
        </div>
      </div>

      <div className="pagination" ref={myRef}>
        <div className="total d-flex">
          <div> Tổng : </div>
          <div>{totalUser}</div>
        </div>
        <div className="pagination-wrapper">
          <div className="select-size">
            Size:
            <input
              min={7}
              max={totalUser}
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
      <div className="table-row table-head">
        <div className="stt">#</div>
        <div className="username">Tên</div>
        <div className="phone">Số điện thoại </div>
        <div className="gmail">Gmail</div>
        <div className="avatar">Ảnh </div>
        <div className="actions">Khóa/Sửa</div>
      </div>

      <div className="table-row-wrapper">
        {users?.length > 0 && !isLoading ? (
          users?.map((user, key) => {
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
                  <AiFillEdit
                    className="icon-edit"
                    onClick={() => {
                      setIsEditUser(true);
                      setIsEditedUser(user);
                    }}
                  />
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
