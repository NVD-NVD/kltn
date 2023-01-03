import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axiosClient from "../../../../apis/clientAxios";
import { ModalLMS } from "../../../../components/Modal";
import useAuth from "../../../../stores/auth";
import { notifyError, notifySuccess } from "../../../../utils/notify";

interface Props {
  cancel2: Function;
  open2: boolean;
}

const ModalChangePass = (props: Props) => {
  const history = useHistory();
  const [auth] = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const submit = async (data: any, e: any) => {
    console.log('temp', data);
    e.preventDefault();
    const res = await axiosClient.put(`users/password`, data);
    if(res.status === 200)
    {
      notifySuccess('thanh cong');
      reset();
      console.log('temp 1', res);
      //location.reload()
    }
    else {
      console.log('temp2', res.data);
      //notifyError(res.data);
    }
  };
  return (
    <div>
      {props.open2 ? (
        <ModalLMS title="Change Password" withHeader={true} cancel={props.cancel2}>
          <div className="changeInfo">
            <form onSubmit={handleSubmit(submit)} className="changInfomation">
              <p>Change Pass</p>
              <input
                type="password"
                {...register("oldPass")}
                id="phone"
                className="form-control"
                placeholder="Old Password"
              />
              <p></p>
              <input
                type="password"
                id="name"
                {...register("newPass")}
                className="form-control"
                placeholder="New Password"
              />
              <p></p>

              <button
                id="changepassword"
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

export default ModalChangePass;
