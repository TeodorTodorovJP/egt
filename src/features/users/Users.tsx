import { useAppDispatch } from "../../app/hooks"
import { UserForm } from "./UserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import { Collapse, type CollapseProps } from "antd"
import { addAllUsers } from "./usersSlice"
import { useEffect } from "react"

export const Users = () => {
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery(10)
  const dispatch = useAppDispatch()

  const getOpenedUsers = (key: string | string[]) => {
    console.log("toggled: ", key)
  }

  useEffect(() => {
    if (data) {
      dispatch(addAllUsers(data))
    }
  }, [data, dispatch])

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

  if (isSuccess) {
    const items: CollapseProps["items"] = data.map(user => {
      const decorated = {
        key: user.id,
        label: user.name,
        children: <UserForm userId={user.id} />,
      }
      return decorated
    })

    return (
      <div>
        <Collapse items={items} defaultActiveKey={["1"]} onChange={getOpenedUsers} />
      </div>
    )
  }

  return null
}
