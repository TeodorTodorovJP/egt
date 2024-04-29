import { type UserType } from "./usersApiSlice"
export const User = ({ user }: { user: UserType }) => {
  //const { data, isError, isLoading, isSuccess } = useGetUserQuery(user.id)

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    )
  }

  return null
}
