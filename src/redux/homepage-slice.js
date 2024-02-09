import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
