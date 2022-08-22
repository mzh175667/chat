import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

///////////////update seen messages/////////////////////
export const UPDATE_SEEN_MESSAGE = createAsyncThunk("comment", async (id) => {
  const results = await fetch(`http://localhost:5000/messages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      seen: true,
    }),
  }).then((response) => response.json());
  return results;
});
export const DataReducer = createSlice({
  name: "data",
  initialState: {
    forSeen: [],
  },
  extraReducers: {
    // for seen messages of chat
    [UPDATE_SEEN_MESSAGE.pending]: (state) => {
      state.loading = true;
    },
    [UPDATE_SEEN_MESSAGE.fulfilled]: (state, action) => {
      state.loading = false;
      state.forSeen = action.payload;
    },
    [UPDATE_SEEN_MESSAGE.rejected]: (state) => {
      state.loading = false;
    },
    /////////////////////////
  },
});
export default DataReducer.reducer;
