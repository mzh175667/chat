import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const Get_Data = createAsyncThunk("getData", async () => {
  const results = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());
  return results;
});
export const Get_Data_Comment = createAsyncThunk("comment", async () => {
  const results = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  ).then((response) => response.json());
  return results;
});

export const Get_Data_Quotes = createAsyncThunk("quotes", async () => {
  const results = await axios.get("https://api.quotable.io/random");
  console.log("responseInReducer", results);
  return results;
});
export const Get_USER_DATA = createAsyncThunk("getUser", async () => {
  const results = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((response) => response.json());
  console.log("responseInReducer", results);
  return results;
});

export const DataReducer = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    comments: [],
    quotes: {},
    users: [],
  },
  extraReducers: {
    [Get_Data.pending]: (state) => {
      state.loading = true;
    },
    [Get_Data.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [Get_Data.rejected]: (state) => {
      state.loading = false;
    },
    [Get_Data_Comment.pending]: (state) => {
      state.loading = true;
    },
    [Get_Data_Comment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [Get_Data_Comment.rejected]: (state) => {
      state.loading = false;
    },
    [Get_Data_Quotes.pending]: (state) => {
      state.loading = true;
    },
    [Get_Data_Quotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.quotes = action.payload;
    },
    [Get_Data_Quotes.rejected]: (state) => {
      state.loading = false;
    },
    [Get_USER_DATA.pending]: (state) => {
      state.loading = true;
    },
    [Get_USER_DATA.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [Get_USER_DATA.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default DataReducer.reducer;
