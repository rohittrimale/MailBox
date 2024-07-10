import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import mailReducer from "../slice/mailBoxSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mailbox: mailReducer,
  },
});
