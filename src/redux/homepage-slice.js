import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      localStorage.setItem("todoDataID", JSON.stringify(state.id));
    },

    deleteTask: (state, payload) => {
      const temp = state.tasks.filter(
        (task) => task.id !== parseInt(payload.payload)
      );
      state.tasks = temp;
      localStorage.setItem("todoData", JSON.stringify(temp));
    },

    increaseCompletedTask: (state) => {
      state.completedTask += 1;
      localStorage.setItem(
        "todoDataCompletedTask",
        JSON.stringify(state.completedTask)
      );
    },

    decreaseCompletedTask: (state) => {
      state.completedTask -= 1;
      localStorage.setItem(
        "todoDataCompletedTask",
        JSON.stringify(state.completedTask)
      );
    },

    setID: (state, payload) => {
      state.id = parseInt(payload.payload);
    },

    setCompletedTask: (state, payload) => {
      state.completedTask = parseInt(payload.payload);
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
