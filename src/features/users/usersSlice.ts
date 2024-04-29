import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type UserType } from "./usersApiSlice"

export interface UsersSliceState {
  users: UserType[] | []
}

const initialState: UsersSliceState = {
  users: [],
}

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    addAllUsers: create.reducer((state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    }),
    updateUser: create.reducer((state, action: PayloadAction<UserType>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id)
      state.users[userIndex] = action.payload
    }),
  }),
  selectors: {
    selectUsers: state => state.users,
    selectUser: (state, id) => state.users.filter(user => user.id === id)[0],
  },
})

// Action creators are generated for each case reducer function.
export const { updateUser, addAllUsers } = usersSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers, selectUser } = usersSlice.selectors
