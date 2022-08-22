import { configureStore } from "@reduxjs/toolkit";
import ChatReducers from "../Reducers/ChatReducers";
import DataReducers from "../Reducers/DataReducers";
export const store = configureStore({
  reducer: {
    userData: DataReducers,
    chat: ChatReducers,
  },
});
