import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axiosClient from "../../../../apis/clientAxios";
import { ModalLMS } from "../../../../components/Modal";
import useAuth from "../../../../stores/auth";

interface Props {
  cancel: Function;
  open: boolean;
}

const ModalChangeInfo = (props: Props) => {
  const history = useHistory();
  const [auth] = useAuth()
  const { register, handleSubmit } = useForm();
  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const res = await axiosClient.put(`user/${(auth.user as any).id}`, data);
    if(res)
    {
      location.reload()
    }
  };
  return (
    <div>
      {props.open ? (
        <ModalLMS title="Change InFo" withHeader={true} cancel={props.cancel}>
          <div className="changeInfo">
            <form onSubmit={handleSubmit(submit)} className="changInfomation">
              <p>INFOMATION</p>
              <input
                type=""
                {...register("phone")}
                id="phone"
                className="form-control"
                placeholder="Phone"
              />
              <p></p>
              <input
                type="text"
                id="fullname"
                {...register("fullname")}
                className="form-control"
                placeholder="Name"
              />
              <p></p>
              <input
                type="text"
                id="address"
                {...register("address")}
                className="form-control"
                placeholder="Địa chỉ"
              />
              <p></p>
{/* 
              <input
                type="text"
                id="gender"
                {...register("gender")}
                className="form-control"
                placeholder="Giới tính"
              />
              <p></p> */}

              <button
                id="changeinfo"
                className="btn btn-block login-btn mb-4"
                type="submit"
                style={{ backgroundColor: "#87CEFA" }}
              >
                Submit
              </button>
            </form>
          </div>
        </ModalLMS>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ModalChangeInfo;
