import { Button, Card, Collapse, Space, Spin } from "antd"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { UserForm } from "../users/UserForm"
import { selectUser } from "../users/usersSlice"
import { PostForm } from "./PostForm"
import { useGetUserPostsQuery } from "./postsApiSlice"
import { addAllPosts } from "./postsSlice"
import { setError } from "../../errorSlice"

export const Posts = () => {
  const { id } = useParams()
  // React Router does not provide a guaranteed param, so id could be undefined
  // Here a default id of 1 is provided, to go around this issue
  const userId = id ? +id : 1
  const { data: posts, isError, isLoading, error } = useGetUserPostsQuery(String(userId))
  const userData = useAppSelector(state => selectUser(state, userId))
  const dispatch = useAppDispatch()
  /** Access Router */
  const navigate = useNavigate()

  useEffect(() => {
    if (posts) {
      dispatch(addAllPosts(posts))
    }
  }, [posts, dispatch])

  if (isError) {
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

  if (posts?.length === 0) {
    return (
      <div>
        <h1>No posts found!</h1>
      </div>
    )
  }

  const userItem = [
    {
      key: userData.id,
      label: userData.name,
      children: <UserForm userId={String(userId)} />,
    },
  ]

  return (
    <>
      <Collapse items={userItem} />
      <Button onClick={() => navigate(-1)} style={{ margin: "20px" }}>
        Go back
      </Button>
      <Space direction="horizontal" align="baseline" wrap size={"small"} style={{ gap: "20px" }}>
        {posts?.map(post => (
          <Card key={post.id} style={{ width: "94vw", marginLeft: "1vw", marginRight: "1vw" }}>
            <PostForm postId={post.id} />
          </Card>
        ))}
      </Space>
    </>
  )
}
