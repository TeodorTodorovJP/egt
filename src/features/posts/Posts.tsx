import { PostForm } from "./PostForm"
import { useGetUserPostsQuery } from "./postsApiSlice"
import { Button, Card, Collapse, Space, type CollapseProps } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { UserForm } from "../users/UserForm"
import { selectUser, selectUsers } from "../users/usersSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Button as CustomButton } from "../../app/components/Button"
import { useEffect } from "react"
import { addAllPosts } from "./postsSlice"

export const Posts = () => {
  const { id } = useParams()
  // React Router does not provide a guaranteed param, so id could be undefined
  // Here a default id of 1 is provided, to go around this issue
  const userId = id ? +id : 1
  const { data: posts, isError, isLoading } = useGetUserPostsQuery(String(userId))
  const userData = useAppSelector(state => selectUser(state, userId))
  const dispatch = useAppDispatch()
  /** Access Router */
  const navigate = useNavigate()

  useEffect(() => {
    if (posts) {
      dispatch(addAllPosts(posts))
    }
  }, [posts, dispatch])

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

  const userItem = [
    {
      key: userData.id,
      label: userData.name,
      children: <UserForm userId={String(userId)} />,
    },
  ]

  /*
  To be able to delete a post, I need to invalidate useGetUserPostsQuery to receive a updated array
  This means I will always reload all components 
  */

  return (
    <div>
      <Collapse items={userItem} onChange={getOpenedUsers} />
      <div>
        <CustomButton onClick={() => navigate(-1)} label="Go back" />
        <Space direction="horizontal" align="baseline" wrap size={"small"} style={{ gap: "20px" }}>
          {posts?.map(post => (
            <Card key={post.id} style={{ width: "94vw", marginLeft: "1vw", marginRight: "1vw" }}>
              <PostForm postId={post.id} />
            </Card>
          ))}
        </Space>
      </div>
    </div>
  )
}
