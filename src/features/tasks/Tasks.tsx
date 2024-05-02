import { Button, Dropdown, Form, Input, Space } from "antd"
import { useMemo, type ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import TasksTable from "./TasksTable"
import { useGetTasksQuery } from "./tasksApiSlice"
import { filterTasks, selectFilteredTasks, selectTasksUsers } from "./tasksSlice"

const Tasks = () => {
  const dispatch = useAppDispatch()
  const filteredTasks = useAppSelector(selectFilteredTasks)
  const tasksUsers = useAppSelector(selectTasksUsers)

  const { data: tasks } = useGetTasksQuery(100000)

  const handleCompletedChange = (value: boolean | null) => {
    dispatch(filterTasks({ completed: value }))
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterTasks({ title: event.target.value }))
  }

  const UsersOptions = useMemo(() => {
    return {
      items: tasksUsers.map(user => {
        return {
          key: user.id,
          label: <div onClick={() => dispatch(filterTasks({ userId: user.id }))}>{user.name}</div>,
        }
      }),
    }
  }, [tasksUsers, dispatch])

  const CompletedOptions = {
    items: [
      {
        key: "1",
        label: <div onClick={() => handleCompletedChange(null)}>All</div>,
      },
      {
        key: "2",
        label: <div onClick={() => handleCompletedChange(true)}>Completed</div>,
      },
      {
        key: "3",
        label: <div onClick={() => handleCompletedChange(false)}>Not Completed</div>,
      },
    ],
  }

  if (tasks) {
    return (
      <>
        <Space style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
          <Form.Item label="Title" style={{ margin: "auto" }}>
            <Input placeholder="Task Title" onChange={values => handleTitleChange(values)} />
          </Form.Item>
          <Dropdown menu={CompletedOptions} placement="bottom" arrow={{ pointAtCenter: true }}>
            <Button>Completed</Button>
          </Dropdown>
          <Dropdown
            menu={UsersOptions}
            // onOpenChange={values => handleFiltersChange(values)}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button>User</Button>
          </Dropdown>
        </Space>
        <TasksTable filteredTasks={filteredTasks} />
      </>
    )
  }
}

export default Tasks
