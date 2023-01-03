import "./EditUser.scss";
import { notifyError, notifySuccess } from "../../../../../utils/notify";
import React from "react";
import { FaSadCry } from "react-icons/fa";
import { editUserAsync } from "../../../../../apis/user/editUser.api";
export const EditUser = ({ setVisibility, user }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [gender, setGender] = React.useState(user?.gender);
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState(user?.email);
  const [day, setDay] = React.useState(1);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(1900);
  return (
    <div className="edit-user">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <form className="signUpPage-form-content">
          <p>Chỉnh sửa thông tin người dùng</p>
          Email:
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="Nhập địa chỉ email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          Tên:
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Nhập tên "
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <div className="gender">
            Giới tính :{" "}
            <select
              value={gender}
              onChange={(e: any) => {
                setGender(e.target.value);
              }}
            >
              {genders?.map((g: any) => (
                <option value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="birthday">
            Ngày sinh:
            <select value={day} onChange={(e: any) => setDay(e.target.value)}>
              {Array.from(Array(32).keys()).map(
                (k: any) => k !== 0 && <option value={k}>{k}</option>
              )}
            </select>
            <select
              value={month}
              onChange={(e: any) => setMonth(e.target.value)}
            >
              {Array.from(Array(13).keys()).map(
                (k: any) => k !== 0 && <option value={k}>{k}</option>
              )}
            </select>
            <select value={year} onChange={(e: any) => setYear(e.target.value)}>
              {Array.from(Array(30).keys()).map((k: any) => (
                <option value={k + Number(year)}>{k + Number(year)}</option>
              ))}
            </select>
          </div>
          <div
            className="btn btn-edit login-btn mb-4"
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => setIsSubmitting(false), 1000);
              editUserAsync({
                email: email,
                gender: gender,
                name: name,
                birthday: [day, month, year].join("-"),
                userID: user.id,
              }).then((rs) => {
                if (rs && rs?.data) {
                  notifyError("Sửa thông tin thành công");
                }
              });
            }}
          >
            {!isSubmitting ? (
              "Sửa"
            ) : (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const genders = ["Nam", "Nữ"];
