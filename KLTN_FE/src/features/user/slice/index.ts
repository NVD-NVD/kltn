import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";
import { UserStateTypes } from "../type";
import { getUserToken } from "./thunk";

const initialState: Partial<UserStateTypes> = {
  expired: "",
  token: "",

  roles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getDetailUser: (state, action: PayloadAction<any>) => {
      state.expired = action.payload.expired;
    },
    deleteUser: (state) => {
      state.expired = "";
      state.token = "";
      state.token_type = "";
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserToken.fulfilled, (state, action) => {
      state.expired = action.payload.expired;
      state.token = action.payload.token;
      state.token_type = action.payload.token_type;
      state.roles = action.payload.roles;
    });
  },
});

export const { getDetailUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
