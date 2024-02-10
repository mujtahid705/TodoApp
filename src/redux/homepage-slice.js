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
      //   state.tasks = state.tasks.filter(
      //     (task) => task.id !== parseInt(payload.payload)
      //   );
      console.log(payload.payload);
      const temp = state.tasks.filter((task) => {
        console.log(task.id, "VS", payload.payload);
        return task.id !== parseInt(payload.payload);
      });
      console.log(temp);
      state.tasks = temp;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
