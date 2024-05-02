import { Button, Table } from "antd"
import { memo, useState } from "react"
import { type TaskType } from "./tasksApiSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { completeTask, filterTasks, getLatestFilter } from "./tasksSlice"

const TasksTable = memo(({ filteredTasks }: { filteredTasks: TaskType[] }) => {
  const dispatch = useAppDispatch()
  const latestFiler = useAppSelector(getLatestFilter)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const handleCompleteClick = (task: TaskType) => {
    dispatch(completeTask(task))
    dispatch(filterTasks(latestFiler))
  }

  const columns = [
    // {
    //   title: "User ID",
    //   dataIndex: "userId",
    //   key: "userId",
    // },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (completed ? "Yes" : "No"),
    },
    {
      title: "Complete",
      dataIndex: "completed",
      key: "complete",
      render: (completed: boolean, record: TaskType) =>
        !completed ? (
          <Button
            onClick={event => {
              handleCompleteClick(record)
            }}
          >
            Complete
          </Button>
        ) : null,
    },
  ]

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const tasksToShow = filteredTasks.slice(startIndex, endIndex)

  return (
    <Table
      columns={columns}
      dataSource={tasksToShow}
      rowKey="id"
      pagination={{
        total: filteredTasks.length,
        pageSize: pageSize,
        current: currentPage,
        onChange: handleChangePage,
      }}
    />
  )
})

export default TasksTable
