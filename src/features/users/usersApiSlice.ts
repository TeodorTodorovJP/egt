import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { selectUser, selectUsers, updateUser } from "./usersSlice"
import { type RootState } from "../../app/store"

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
       * When the query get's the user data replaces it with the updated data from the store
       * then updates's the cache, to simulate a real update.
       */
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            const store = getState() as RootState
            const user = selectUser(store, arg)
            updateCachedData(draft => user)
          }
        } catch (error) {
          //
        }
      },
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),
    /**
     * Get's all users
     */
    getUsersOld: build.query<UserType[], number>({
      query: () => ``,
      providesTags: (result, error, id) => [{ type: "users", id }],
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            const store = getState() as RootState
            const user = selectUser(store, arg)
            updateCachedData(draft => {
              const updated = draft.map(draftedUser => {
                if (user.id === String(arg)) {
                  return user
                }
                return draftedUser
              })
              return updated
            })
          }
        } catch (error) {
          //
        }
      },
    }),
    getUsers: build.query<UserType[], number>({
      query: () => ``,
      providesTags: (result, error, id) => [{ type: "users", id }],
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            const store = getState() as RootState
            const { users } = store.users
            updateCachedData(draft => (users && users.length ? users : draft))
          }
        } catch (error) {
          //
        }
      },
    }),
    /**
     * Updates the user in the API (not working).
     * To simulate a working API, saves the changes in the store, to be used in @getUser
     */
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
      invalidatesTags: (result, error, user) => [
        { type: "user", id: user.id },
        { type: "users", id: 10 },
      ],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = usersApiSlice
