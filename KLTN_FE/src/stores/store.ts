import {
  configureStore,
  StateFromReducersMapObject,
  DeepPartial,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import authReducer from "../features/auths/slice";
import userReducer from "../features/user/slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
const persetConfig = {
  key: "root",
  storage,
};
const persitedReducer = persistReducer(persetConfig, reducer);

export type IRootState = StateFromReducersMapObject<typeof reducer>;
type Store = ReturnType<typeof initConfigStore>;

function initConfigStore(preloadedState?: DeepPartial<IRootState>) {
  return configureStore({
    reducer: persitedReducer,
    preloadedState: preloadedState,
    // middleware: [thunk],
  });
}

export const store = initConfigStore();
export const persitStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
