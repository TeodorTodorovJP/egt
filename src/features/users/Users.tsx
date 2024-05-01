import { useAppDispatch } from "../../app/hooks"
import { UserForm } from "./UserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import { Collapse, type CollapseProps } from "antd"
import { addAllUsers } from "./usersSlice"
import { useEffect, useMemo } from "react"

export const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery(10)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (users) {
      dispatch(addAllUsers(users))
    }
  }, [users, dispatch])

  const items = useMemo(() => {
    return users?.map(user => {
      const decorated = {
        key: user.id,
        label: user.name,
        children: <UserForm userId={user.id} />,
      }
      // Check for users update [JSON.stringify(users)]
      // Should find where is the problem and why the array reference is not changed
      return decorated
    })
  }, [users])

  const getOpenedUsers = (key: string | string[]) => {
    console.log("toggled: ", key)
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  return <Collapse items={items} defaultActiveKey={["1"]} onChange={getOpenedUsers} />
}
