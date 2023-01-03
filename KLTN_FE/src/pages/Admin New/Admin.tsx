import React, { useEffect } from "react";
import "./Admin.style.scss";
import { FiUsers } from "react-icons/fi";
import { RiBillLine, RiAdminLine } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { nav_list } from "./Admin.hard";
import { ManageUser } from "./components/Manage Users/ManageUser";
import { ManageProduct } from "./components/Manage Products/ManageProduct";
import { ManageBill } from "./components/Manage Bills/ManageBill";
import { getInfoAsync } from "../../apis/auths/getInfo.api";
import { ReturnResponse } from "../../apis/Response";
import { useHistory } from "react-router";
import { BiArrowBack, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ManageCategories } from "./components/Manage Categories/ManageCategories";
import { ManageAdmins } from "./components/Manage Admins/ManageAdmins";
import { ManageTransaction } from "./components/Manage Transaction/ManageTransaction";
export const Admin = () => {
  useEffect(() => {
    const header = document.querySelector("#ftco-navbar") as HTMLElement;
    const footer = document.querySelector("#footer") as HTMLElement;
    const subcribe = document.querySelector("#subcribe") as HTMLElement;
    header.style.display = "none";
    footer.style.display = "none";
    subcribe.style.display = "none";
    return () => {
      header.style.display = "flex";
      footer.style.display = "flex";
      subcribe.style.display = "flex";
    };
  }, []);
  const history = useHistory();
  const [itemActive, setItemActive] = React.useState(0);
  const [admin, setAdmin] = React.useState<any>();
  React.useEffect(() => {
    getInfoAsync().then((rs: any) => setAdmin(rs?.data));
  }, []);
  console.log(admin);
  return (
    <div className="admin-container">
      <div className="container">
        <div className="left">
          <div
            className="btn-back"
            onClick={() => {
              history.push("/");
            }}
          >
            <BiArrowBack className="ic" />
          </div>
          <div className="profile">
            <img
              src="https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/anatolir201105528.jpg?ver=6"
              alt=""
              className="ava"
            />
            <div className="name">{admin?.name}</div>
            <div className="email">
              <div className="txt">Email:</div>
              {admin?.email}
            </div>
            <div className="phone">
              <div className="txt">Phone:</div>
              {admin?.phone}
            </div>
            <div className="line"></div>
          </div>
          <div className="nav-list">
            {nav_list?.map((item, key) => {
              return (
                <div
                  className={
                    key === itemActive ? "nav-item active" : "nav-item"
                  }
                  key={key}
                  onClick={() => setItemActive(key)}
                >
                  {key === 0 && (
                    <>
                      <FiUsers className="ic us" />
                      <div className="dot us"></div>
                      <div className="txt us">{item}</div>
                    </>
                  )}
                  {key === 1 && (
                    <>
                      <MdProductionQuantityLimits className="ic pro" />
                      <div className="dot pro"></div>
                      <div className="txt pro">{item}</div>
                    </>
                  )}
                  {key === 2 && (
                    <>
                      <div className="dot bi"></div>
                      <RiBillLine className="ic bi" />
                      <div className="txt">{item}</div>
                    </>
                  )}
                  {key === 3 && (
                    <>
                      <div className="dot ca"></div>
                      <BiCategoryAlt className="ic ca" />
                      <div className="txt">{item}</div>
                    </>
                  )}
                  {key === 4 && (
                    <>
                      <div className="dot ad"></div>
                      <RiAdminLine className="ic ad" />
                      <div className="txt">{item}</div>
                    </>
                  )}
                  {key === 5 && (
                    <>
                      <div className="dot bi"></div>
                      <MdOutlineAttachMoney className="ic bi" />
                      <div className="txt">{item}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          {itemActive === 0 && <ManageUser />}
          {itemActive === 1 && <ManageProduct />}
          {itemActive === 2 && <ManageBill />}
          {itemActive === 3 && <ManageCategories />}
          {itemActive === 4 && <ManageAdmins />}
          {itemActive === 5 && <ManageTransaction />}
        </div>
      </div>
    </div>
  );
};
export default Admin;
