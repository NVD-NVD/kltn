import React from "react";
import { addCategory } from "../../../../../apis/category/addCategory";
import "./CreateCategory.style.scss";

export const CreateCategory = ({ setVisibility }: any) => {
  const [title, setTitle] = React.useState<any>();
  return (
    <div className="create-category">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <div className="label">Nhập tên category muốn thêm: </div>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div
          className="btn-ok"
          onClick={() => {
            addCategory(title);
            setVisibility(false);
          }}
        >
          OK
        </div>
      </div>
    </div>
  );
};
