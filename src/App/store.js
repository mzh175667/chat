import { configureStore } from "@reduxjs/toolkit";
import DataReducers from "../Reducers/DataReducers"
export const store = configureStore({
 reducer:{
     userData : DataReducers
   }
})