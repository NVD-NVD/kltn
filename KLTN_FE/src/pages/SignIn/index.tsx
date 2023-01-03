import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginAsync } from "../../apis/auths/login.api";
import { getDetailUser } from "../../features/user/slice";
import { selectUserDetail } from "../../features/user/slice/selector";
import { getUserToken } from "../../features/user/slice/thunk";
import useAuth from "../../stores/auth";
import { AppDispatch, RootState } from "../../stores/store";
import useToken from "../../stores/token";
import useUser from "../../stores/user";
import { notifyError, notifySuccess } from "../../utils/notify";
import { signInSchema } from "../../validate/auth";
import "./style.scss";

interface SignInProps {}

export const SignIn = (props: SignInProps) => {
  const history = useHistory();
  const [auth, actionAuth] = useAuth();
  const [, { assignToken }] = useToken();
  const [token, setToken] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const submit = async (data: any, e: any) => {
    e.preventDefault();
    assignToken(data);
    history.push("/");
    dispatch(getUserToken(data));
  };
  useEffect(() => {}, []);

  return (
    <div className="signInPage container">
      <div className="signInPage-form">
        <div className="signInPage-form-img">
          <img
            src="http://media.bizwebmedia.net/sites/63100/data/Upload/2016/1/bang_ao_quan_the_thao_nam_nu.JPG"
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="signInPage-form-content"
        >
          <p>Đăng nhập tài khoản</p>
          <input
            type="text"
            {...register("phone")}
            id="phone"
            className="form-control"
            placeholder="Nhập địa chỉ email"
          />
          <p className="text-danger">{errors.phone?.message}</p>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="form-control"
            placeholder="Nhập mật khẩu"
          />
          <p className="text-danger">{errors.password?.message}</p>

          <button
            id="login"
            className="btn btn-block login-btn mb-4"
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting ? (
              "Đăng nhập"
            ) : (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
          <Link to="/forgotpass">Quên mật khẩu ?</Link>
          <p></p>
          <p>
            Chưa có tài khoản ? <Link to="/signup">Đăng kí ở đây</Link>
          </p>
          <p>
            Đăng nhập với{" "}
            <a href="#">
              <IoLogoGoogle />
            </a>
            {""}{" "}
            <a href="#">
              <IoLogoFacebook />
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
