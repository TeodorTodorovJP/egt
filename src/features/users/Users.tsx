import { User } from "./User"
import { UserForm } from "./UserForm"
import { useGetUsersQuery, type UserType } from "./usersApiSlice"
import { Collapse, type CollapseProps, List, CollapsePanelProps } from "antd"

export const Users = () => {
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery(10)

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

  if (isSuccess) {
    console.log("Updated User Name: ", data[0].name)
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
