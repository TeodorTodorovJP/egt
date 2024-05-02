import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type TaskType } from "./tasksApiSlice"
import { addAllUsers } from "../users/usersSlice"

export interface User {
  id: string
  name: string
}

export interface TasksSliceState {
  users: User[] | []
  tasks: TaskType[] | []
  filteredTasks: TaskType[]
  latestFilter: FilterTasksProps
}

export interface FilterTasksProps {
  completed?: boolean | null
  title?: string | null
  userId?: string | null
}

const initialState: TasksSliceState = {
  users: [],
  tasks: [],
  filteredTasks: [],
  latestFilter: {},
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: create => ({
    /** Fills all tasks.*/
    setTasks: create.reducer((state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload
    }),
    completeTask: create.reducer((state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.payload.id) {
          task.completed = true
        }
        return task
      })
    }),
    filterTasks: create.reducer((state, action: PayloadAction<FilterTasksProps>) => {
      const { userId, title, completed } = action.payload
      state.latestFilter = action.payload
      state.filteredTasks = state.tasks.filter(task => {
        let matches = true
        if (userId) {
          matches = matches && task.userId === userId
        }
        if (completed) {
          matches = matches && task.completed === completed
        }
        if (title) {
          matches = matches && task.title.toLowerCase().includes(title.toLowerCase())
        }
        return matches
      })
    }),
  }),
  extraReducers: builder => {
    builder.addCase(addAllUsers, (state, action) => {
      const users = action.payload
      state.users = users.map(user => {
        return {
          id: user.id,
          name: user.name,
        }
      })
    })
  },
  selectors: {
    selectTasks: state => state.tasks,
    selectTask: (state, id) => state.tasks.filter(task => task.id === id)[0],
    selectFilteredTasks: state => state.filteredTasks,
    selectTasksUsers: state => state.users,
    getLatestFilter: state => state.latestFilter,
  },
})

// Action creators are generated for each case reducer function.
export const { setTasks, completeTask, filterTasks } = tasksSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTasks, selectTask, selectFilteredTasks, selectTasksUsers, getLatestFilter } = tasksSlice.selectors
