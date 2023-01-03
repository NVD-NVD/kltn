import { createHook, createStore } from "react-sweet-state";
type userState = {
  token: string;
  roles: Array<string>;
};
const init = {
  token: "",
  roles: [""],
};
const Store = createStore({
  name: "user",
  initialState: {
    user: init,
  },
  actions: {
    setUser:
      (us: userState) =>
      ({ setState, getState }) => {
        setState({ user: us });
      },
    removeUser:
      () =>
      ({ getState, setState }) => {
        setState({ user: init });
      },
  },
});
const useUser = createHook(Store);
export default useUser;
