import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setTasks } from "./tasksSlice"

export interface TaskType {
  userId: string
  id: string
  title: string
  completed: boolean
}

export const tasksApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
  }),
  reducerPath: "tasksApi",
  tagTypes: ["tasks"],
  endpoints: build => ({
    /** Fills all tasks.*/
    getTasks: build.query<TaskType[], number>({
      query: () => ``,
      providesTags: (result, error, arg) =>
        result ? [...result.map(({ id }) => ({ type: "tasks" as const, id })), "tasks"] : ["tasks"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(setTasks(data))
        }
      },
    }),
  }),
})

export const { useGetTasksQuery } = tasksApiSlice
