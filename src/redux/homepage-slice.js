import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  id: 0,
};

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    increaseID: (state) => {
      state.id += 1;
    },

    deleteTask: (state, payload) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== parseInt(payload.payload)
      );
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
