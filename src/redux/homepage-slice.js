import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Mujtahid",
  tasks: [],
  id: 0,
  completedTask: 0,
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
      const temp = state.tasks.filter(
        (task) => task.id !== parseInt(payload.payload)
      );
      state.tasks = temp;
    },

    increaseCompletedTask: (state) => {
      state.completedTask += 1;
    },

    decreaseCompletedTask: (state) => {
      state.completedTask -= 1;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
