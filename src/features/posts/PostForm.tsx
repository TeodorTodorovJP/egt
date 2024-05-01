import { Form as AntForm, Button, Flex, Input } from "antd"
import { Field, Form, Formik, type FormikHelpers } from "formik"
import { memo } from "react"
import { useDeletePostMutation, useGetPostQuery, useUpdatePostMutation, type PostType } from "./postsApiSlice"
import postsSchema from "./validationSchema"

export const PostForm = memo(({ postId }: { postId: string }) => {
  const { data: post } = useGetPostQuery(postId)
  const [updateUser] = useUpdatePostMutation()
  const [deleteUser] = useDeletePostMutation()
  const onSubmit = (values: PostType, formikHelpers: FormikHelpers<PostType>) => {
    console.log("submitValues: ", values.title)
    updateUser(values)
    formikHelpers.setSubmitting(false)
  }

  const handleDelete = (post: PostType) => {
    console.log("handleDelete: ", post)
    deleteUser(post)
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
                <AntForm.Item
                  label="Title"
                  validateStatus={errors.title ? "error" : undefined}
                  help={errors.title ? errors.title : null}
                >
                  <Field
                    type="text"
                    name="title"
                    as={Input.TextArea}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    variant="filled"
                    style={{ width: "92vw" }}
                  />
                </AntForm.Item>
              </Flex>

              <Flex justify="center" align="center" gap="10px" style={{ flexDirection: "column" }}>
                <AntForm.Item
                  label="Text"
                  validateStatus={errors.body ? "error" : undefined}
                  help={errors.body ? errors.body : null}
                >
                  <Field
                    type="text"
                    name="body"
                    as={Input.TextArea}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    variant="filled"
                    style={{ width: "92vw" }}
                  />
                </AntForm.Item>
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
    </div>
  ) : (
    <>No post</>
  )
})
