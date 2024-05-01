import { type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./app/createAppSlice"

export interface ErrorSliceState {
  showErrorModal: boolean
  errorMessage: string
}

const initialState: ErrorSliceState = {
  showErrorModal: false,
  errorMessage: "",
}

export const errorSlice = createAppSlice({
  name: "error",
  initialState,
  reducers: create => ({
    /** Fills all users.*/
    setError: create.reducer((state, action: PayloadAction<string>) => {
      state.showErrorModal = true
      state.errorMessage = action.payload
    }),
    /** Updates a single user.*/
    clearError: create.reducer(state => {
      state.showErrorModal = false
      state.errorMessage = ""
    }),
  }),
  selectors: {
    selectShowErrorModal: state => state.showErrorModal,
    selectErrorMessage: state => state.errorMessage,
  },
})

// Action creators are generated for each case reducer function.
export const { setError, clearError } = errorSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectShowErrorModal, selectErrorMessage } = errorSlice.selectors
