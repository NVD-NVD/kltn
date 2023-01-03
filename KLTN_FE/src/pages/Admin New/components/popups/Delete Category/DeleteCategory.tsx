import React from "react";
import "./DeleteCategory.style.scss";

export const DeleteCategory = ({ setVisibility, payload, fn }: any) => {
  console.log("payload delete", payload);
  return (
    <div className="delete-category">
      <div
        className="bg"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div className="content">
        <div className="label">Bạn có chắc chắn muốn xóa ? </div>
        <div
          className="btn-cancel"
          onClick={() => {
            setVisibility(false);
          }}
        >
          Hủy
        </div>
        <div
          className="btn-ok"
          onClick={() => {
            fn(payload);
            setVisibility(false);
          }}
        >
          OK
        </div>
      </div>
    </div>
  );
};
