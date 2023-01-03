import { SignUp } from "../../../../SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import "./CreateUser.style.scss";
import { signUpSchema } from "../../../../../validate/auth";
import { registerAsync } from "../../../../../apis/auths/register.api";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../../utils/notify";
import { createNewAdminAsync } from "../../../../../apis/user/createNewAdmin.api";
import { createNewUserAsync } from "../../../../../apis/user/createNewUser.api";
export const CreateUser = ({ setVisibility, type }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  console.log(type);
  const submit = async (data: any, e: any) => {
    e.preventDefault();
    delete data.confirmPassword;
    if (type === "user") {
      createNewUserAsync(data)
        .then((rs: any) => {
          if (rs) {
            // notifySuccess(`Tài khoản ${data.name} đã được tạo thành công `);
            setVisibility(false);
          }
        })
        .catch((err: any) => notifyError(err.data.message));
    }
    if (type === "admin") {
      createNewAdminAsync(data)
        .then((rs: any) => {
          console.log(rs);
          if (rs) {
            notifySuccess(
              `Tài khoản admin ${data.name} đã được tạo thành công `
            );
            setVisibility(false);
          }
        })
        .catch((err: any) => notifyError(err.data.message));
    }
  };
  return (
    <div className="create-user">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <form
          onSubmit={handleSubmit(submit)}
          className="signUpPage-form-content"
        >
          {type === "user" ? (
            <p>Đăng kí tài khoản</p>
          ) : (
            <p>Đăng kí tài khoản Admin</p>
          )}
          <input
            type="email"
            {...register("email")}
            id="email"
            className="form-control"
            placeholder="Nhập địa chỉ email"
          />
          <p className="text-danger">{errors.email?.message}</p>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="form-control"
            placeholder="Nhập tên "
          />
          <p className="text-danger">{errors.name?.message}</p>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            className="form-control"
            placeholder="Nhập số điện thoại  "
          />

          <p className="text-danger">{errors.phone?.message}</p>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
          />
          <p className="text-danger">{errors.password?.message}</p>
          <input
            type="password"
            {...register("confirmPassword")}
            id="confirmPassword"
            className="form-control"
            placeholder="Nhập lại "
          />
          <p className="text-danger">{errors.confirmPassword?.message}</p>
          <button
            id="register"
            className="btn btn-block login-btn mb-4"
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting ? (
              "Thêm tài khoản"
            ) : (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
