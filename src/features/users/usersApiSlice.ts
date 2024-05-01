import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { type RootState } from "../../app/store"
import { setError } from "../../errorSlice"
import { selectUser, updateUser } from "./usersSlice"

interface Geo {
  lat: number
  lng: number
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode?: string
  geo: Geo
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface UserType {
  id: string
  name: string
  username: string
  email: string
  address: Address
  phone?: string
  website?: string
  company: Company
}

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/users",
  }),
  reducerPath: "usersApi",
  tagTypes: ["user", "users"],
  endpoints: build => ({
    getUser: build.query<UserType, string>({
      query: id => `/${id}`,
      /**
       * The provided API supports only GET methods
       * When the post is updated, the tags here will be invalidated
       * this will trigger a new query, after 'queryFulfilled' we replace
       * the returned value with what we stored.
       */
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            // Get the store
            const store = getState() as RootState
            // Get the user from the store
            const user = selectUser(store, arg)
            // Update the cached data with the stored user
            updateCachedData(draft => user)
          }
        } catch (error) {
          dispatch(setError("An error occurred: " + error))
        }
      },
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),
    /** Fills all users.*/
    getUsers: build.query<UserType[], number>({
      query: () => ``,
      providesTags: (result, error, id) => [{ type: "users", id }],
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            const store = getState() as RootState
            const { users } = store.users
            // If it finds stored users it will use them instead
            // Part of the logic for going around the API
            updateCachedData(draft => (users && users.length ? users : draft))
          }
        } catch (error) {
          dispatch(setError("An error occurred: " + error))
        }
      },
    }),
    /** Updates the user. */
    updateUser: build.mutation<UserType, UserType>({
      query: user => ({
        url: `/${user.id}`,
        method: "PUT",
        body: user, // Payload
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // transformResponse is not applicable for the task because it does not provide dispatch
      onCacheEntryAdded(arg, { dispatch }) {
        //When the cache is updated, update the store
        dispatch(updateUser(arg))
      },
      // Invalidate for the single user query (getUser) and for all users (getUsers)
      invalidatesTags: (result, error, user) => [
        { type: "user", id: user.id },
        { type: "users", id: 10 },
      ],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = usersApiSlice
