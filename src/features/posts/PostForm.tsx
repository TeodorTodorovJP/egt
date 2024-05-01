import { Button, Flex } from "antd"
import { Form, Formik, type FormikHelpers } from "formik"
import { memo, useState } from "react"
import ConfirmationModal from "../../app/components/ConfirmationModal"
import FormTextArea from "../../app/components/FormTextArea"
import { useDeletePostMutation, useGetPostQuery, useUpdatePostMutation, type PostType } from "./postsApiSlice"
import postsSchema from "./validationSchema"

export const PostForm = memo(({ postId }: { postId: string }) => {
  const { data: post } = useGetPostQuery(postId)
  const [updateUser] = useUpdatePostMutation()
  const [deleteUser] = useDeletePostMutation()
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [postForDeletion, setPostForDeletion] = useState<null | PostType>(null)

  const onSubmit = (values: PostType, formikHelpers: FormikHelpers<PostType>) => {
    updateUser(values)
    formikHelpers.setSubmitting(false)
  }

  const handleDelete = (post: PostType) => {
    setConfirmationModalVisible(true)
    setPostForDeletion(post)
  }

  const handleConfirmation = () => {
    if (postForDeletion) {
      deleteUser(postForDeletion)
    }
    setConfirmationModalVisible(false)
  }

  const handleCancelConfirmation = () => {
    setPostForDeletion(null)
    setConfirmationModalVisible(false)
  }

  if (!post) {
    return (
      <div>
        <h1>No post found!</h1>
      </div>
    )
  }

  return post ? (
    <div style={{ position: "relative" }}>
      <Formik
        initialValues={post}
        enableReinitialize
        validationSchema={postsSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
      >
        {({ isSubmitting, dirty, errors, handleReset }) => (
          <Form>
            <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
              <Flex justify="center" align="center" gap="10px" style={{ flexDirection: "column" }}>
                <FormTextArea name="title" label="Title" error={errors.title} />
              </Flex>

              <Flex justify="center" align="center" gap="10px" style={{ flexDirection: "column" }}>
                <FormTextArea name="body" label="Text" error={errors.body} />
              </Flex>
            </Flex>
            <Flex justify="center" align="center" style={{ gap: "10px" }}>
              <Button
                htmlType="button"
                onClick={() => handleReset()}
                disabled={isSubmitting || !dirty}
                style={{ background: "orange" }}
              >
                Revert
              </Button>

              <Button htmlType="submit" disabled={isSubmitting || !dirty} type="primary">
                Submit
              </Button>

              <Button
                htmlType="button"
                disabled={isSubmitting}
                type="primary"
                style={{ background: "red" }}
                onClick={() => handleDelete(post)}
              >
                Delete
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <ConfirmationModal
        open={isConfirmationModalVisible}
        onConfirm={handleConfirmation}
        onCancel={handleCancelConfirmation}
      />
    </div>
  ) : (
    <>No post</>
  )
})
