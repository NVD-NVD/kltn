import { useHistory } from "react-router";
import { createStore, createHook } from "react-sweet-state";
import { loginAsync } from "../apis/auths/login.api";
import { notifySuccess } from "../utils/notify";
const Store = createStore({
  name: "token",
  initialState: {
    token: undefined,
  },
  actions: {
    assignToken:
      (payload: any) =>
      ({ setState, getState }) => {
        let tk: any = localStorage.getItem("token");
        loginAsync(payload).then((result: any) => {
          if (result) {
            localStorage.setItem("token", result.data.token);
            notifySuccess("Sign in success");
            setState({ token: result?.data?.token });
          }
        });
      },
    removeToken:
      () =>
      ({ setState, getState }) => {
        setState({ token: undefined });
      },
  },
});
const useToken = createHook(Store);
export default useToken;
