import React from "react";
import "./style.scss";

interface SignInProps {}

export const ForgotPass = (props: SignInProps) => {
  return (
    <div className="forgotPassPage container">
      <div className="forgotPassPage-form">
        <div className="forgotPassPage-form-img">
          <img
            src="https://www.bootstrapdash.com/demo/login-template-free-2/assets/images/login.jpg"
            alt=""
          />
        </div>
        <div className="forgotPassPage-form-content">
          <p>Enter your email to get your account back</p>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email address"
          />

          <p></p>

          <button
            name="forgotpass"
            id="forgotpass"
            className="btn btn-block login-btn mb-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
