import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },

    // toggleComplete: (state, action: PayloadAction<string>) => {
    //   const task = state.todos.find((item) => item.id === action.payload);
    //   task!.isCompleted = !task?.isCompleted;
    // },

    // toggleComplete: (state, action: PayloadAction<string>) => {
    //   const task = state.todos.find((item) => item.id === action.payload);
    //   if (task) {
    //     task.isCompleted = !task.isCompleted;
    //   }
    // },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        // Create a copy of the todo object and toggle its isCompleted property
        state.todos[index] = {
          ...state.todos[index],
          isCompleted: !state.todos[index].isCompleted,
        };
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
