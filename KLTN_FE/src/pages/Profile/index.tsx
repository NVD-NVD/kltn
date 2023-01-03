import React, { useState } from "react";
import "./style.scss";
import avatar from "../../images/avatar.jpg";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Badge } from "react-bootstrap";
import ModalChangeInfo from "./components/ModalChangInfo";
import ModalChangePass from "./components/ModalChangePass";
import axiosClient from "../../apis/clientAxios";
import useAuth from "../../stores/auth";
import useToken from "../../stores/token";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/user/slice";
import { IRootState } from "../../stores/store";
import { getInfoAsync } from "../../apis/auths/getInfo.api";

interface ProfilePageProps {}

export const ProfilePage = (props: ProfilePageProps) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector((state: IRootState) => state.user);
  const [userInfo, setUserInfo] = useState();
  const handdleOpen = () => {
    setOpen(true);
  };
  const handdleCancel = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = useState(false);
  const handdleOpen2 = () => {
    setOpen2(true);
  };
  const handdleCancel2 = () => {
    setOpen2(false);
  };
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const submit = async (data: any, e: any) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();

  const onChangeImage = async (e: any) => {
    if (auth.user) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      await axiosClient.put(`user/avatar/${(auth.user as any).id}`, formData);
      location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    history.push("/");
    dispatch(deleteUser());
  };
  React.useEffect(() => {
    getInfoAsync().then((rs: any) => {
      setUserInfo(rs?.data);
    });
  }, [auth]);

  return (
    <div className="profilePage container">
      <div className="profilePage-wrapper">
        <div className="profilePage-wrapper-headerBackground"></div>
        <input
          id="avatar"
          type={"file"}
          onChange={onChangeImage}
          hidden
        ></input>
        <label htmlFor="avatar" className="profilePage-wrapper-avatar">
          <img src={(auth.user as any)?.avatar} alt="" />
        </label>
        <div className="profilePage-wrapper-bottomBackground">
          <div className="signInPage-form-content">
            <h3>
              Tên{" "}
              <span style={{ color: "#87CEFA" }}>
                {(userInfo as any)?.name ||
                  (userInfo as any)?.email ||
                  "Chưa cập nhật"}
              </span>
            </h3>

            <h3>
              SDT{" "}
              <span style={{ color: "#87CEFA" }}>
                {(userInfo as any)?.phone || "Chưa cập nhật"}
              </span>
            </h3>

            <button
              onClick={handdleOpen}
              id="changeinfo"
              className="btn btn-block login-btn mb-4"
              type="submit"
              style={{
                backgroundColor: "#00000",
                color: "#87CEFA",
                border: "2px solid #87CEFA",
              }}
            >
              Thay đổi thông tin
            </button>
            <button
              onClick={handdleOpen2}
              id="changpassword"
              className="btn btn-block login-btn mb-4"
              type="submit"
              style={{
                backgroundColor: "#00000",
                color: "#87CEFA",
                border: "2px solid #87CEFA",
              }}
            >
              Thay đổi mật khẩu
            </button>
            <button
              onClick={handleLogout}
              id="changpassword"
              className="btn btn-block login-btn mb-4"
              type="submit"
              style={{
                backgroundColor: "#00000",
                color: "#87CEFA",
                border: "2px solid #87CEFA",
              }}
            >
              Đăng xuất
            </button>
          </div>
          <ModalChangeInfo open={open} cancel={handdleCancel} />
          <ModalChangePass open2={open2} cancel2={handdleCancel2} />
        </div>
      </div>
    </div>
  );
};
