import { createStore, createHook } from "react-sweet-state";
import { getInfoAsync } from "../apis/auths/getInfo.api";
import axiosClient from "../apis/clientAxios";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    user: undefined,
  },
  // actions that trigger store mutation
  actions: {
    getInfoUser:
      () =>
      async ({ setState, getState }) => {
        // mutate state synchronously

        const token = localStorage.getItem("token");
        const user: any = await getInfoAsync();

        setState({
          user: user?.data,
        });
      },
    clearInfoUser:
      () =>
      ({ getState, setState }) => {
        setState({ user: undefined });
      },
  },
  // optional, mostly used for easy debugging
  name: "auth",
});

const useAuth = createHook(Store);
export default useAuth;
