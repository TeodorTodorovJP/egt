import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),
    getUsers: build.query<UserType[], number>({
      query: () => ``,
      providesTags: (result, error, id) => [{ type: "users", id }],
    }),
    updateUser: build.mutation<UserType[], UserType>({
      query: user => ({
        url: `/${user.id}`,
        method: "PUT",
        body: user, // Payload
        headers: {
          "Content-Type": "application/json",
        },
      }),
      onCacheEntryAdded(arg, { dispatch }) {},
      invalidatesTags: (result, error, user) => [{ type: "user", id: user.id }],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = usersApiSlice
