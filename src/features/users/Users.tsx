import { useAppDispatch } from "../../app/hooks"
import { UserForm } from "./UserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import { Collapse, Spin } from "antd"
import { addAllUsers } from "./usersSlice"
import { useEffect, useMemo } from "react"
import { setError } from "../../errorSlice"

export const Users = () => {
  const { data: users, isError, isLoading, error } = useGetUsersQuery(10)
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
      return decorated
    })
  }, [users])

  if (isError || error) {
    dispatch(setError("An error occurred: " + error))
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }
  if (items?.length === 0) {
    return (
      <div>
        <h1>No users found!</h1>
      </div>
    )
  }
  return <Collapse items={items} defaultActiveKey={["1"]} />
}
