import { Field, Form, Formik, type FormikHelpers } from "formik"
import { useGetUserQuery, useUpdateUserMutation, type UserType } from "./usersApiSlice"
import { Button, Input, Space, Typography, Flex, Form as AntForm, Spin, Result } from "antd"
import { UserOutlined } from "@ant-design/icons"
import userSchema from "./validationSchema"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

export const UserForm = memo(({ userId }: { userId: string }) => {
  const { data: user, isError, isLoading, isSuccess } = useGetUserQuery(userId)
  const [updateUser, mutationState] = useUpdateUserMutation()

  /** Access Router */
  const navigate = useNavigate()

  const onSubmit = (values: UserType, formikHelpers: FormikHelpers<UserType>) => {
    updateUser(values)
    formikHelpers.setSubmitting(false)
  }

  if (isError || mutationState.isError) {
    return (
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reload
          </Button>
        }
      />
    )
  }

  if (isLoading || mutationState.isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  if (user) {
    return (
      <div style={{ position: "relative" }}>
        <Flex justify="center" align="center" style={{ flexDirection: "column", position: "relative" }}>
          <Button htmlType="button" style={{ alignSelf: "end" }} onClick={() => navigate("/todo")}>
            See posts
          </Button>
          <Typography.Title level={2} style={{ alignSelf: "start", marginTop: "-10px" }}>
            {user.name}
          </Typography.Title>
        </Flex>

        <Formik
          initialValues={user}
          enableReinitialize
          validationSchema={userSchema}
          onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
        >
          {({ isSubmitting, dirty, errors, handleReset }) => (
            <Form>
              <Flex justify="center" align="center" gap="10px">
                <Flex style={{ flexDirection: "column" }}>
                  <Typography.Title level={3}>Account info</Typography.Title>

                  <AntForm.Item label="User ID">
                    <Field type="text" disabled name="id" as={Input} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Personal Name"
                    validateStatus={errors.name ? "error" : undefined}
                    help={errors.name ? errors.name : null}
                  >
                    <Field type="text" name="name" as={Input} prefix={<UserOutlined />} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="User Name"
                    validateStatus={errors.username ? "error" : undefined}
                    help={errors.username ? errors.username : null}
                  >
                    <Field type="text" name="username" as={Input} />
                  </AntForm.Item>
                </Flex>

                <Flex style={{ flexDirection: "column" }}>
                  <Typography.Title level={3}>Contacts</Typography.Title>

                  <AntForm.Item
                    label="E-mail"
                    validateStatus={errors.email ? "error" : undefined}
                    help={errors.email ? errors.email : null}
                  >
                    <Field type="text" name="email" as={Input} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Phone"
                    validateStatus={errors.phone ? "error" : undefined}
                    help={errors.phone ? errors.phone : null}
                  >
                    <Field type="text" name="phone" as={Input} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Website"
                    validateStatus={errors.website ? "error" : undefined}
                    help={errors.website ? errors.website : null}
                  >
                    <Field type="text" name="website" as={Input} />
                  </AntForm.Item>
                </Flex>
              </Flex>

              <Flex style={{ flexDirection: "column" }}>
                <Typography.Title level={3} style={{ alignSelf: "center" }}>
                  Address
                </Typography.Title>

                <Flex justify="center" align="center" gap="10px">
                  <Flex style={{ flexDirection: "column" }}>
                    <AntForm.Item
                      label="Street"
                      validateStatus={errors.address?.street ? "error" : undefined}
                      help={errors.address?.street ? errors.address?.street : null}
                    >
                      <Field type="text" name="address.street" as={Input} />
                    </AntForm.Item>

                    <AntForm.Item
                      label="Suite"
                      validateStatus={errors.address?.suite ? "error" : undefined}
                      help={errors.address?.suite ? errors.address?.suite : null}
                    >
                      <Field type="text" name="address.suite" as={Input} />
                    </AntForm.Item>
                  </Flex>

                  <Flex style={{ flexDirection: "column" }}>
                    <AntForm.Item
                      label="City"
                      validateStatus={errors.address?.city ? "error" : undefined}
                      help={errors.address?.city ? errors.address?.city : null}
                    >
                      <Field type="text" name="address.city" as={Input} />
                    </AntForm.Item>

                    <AntForm.Item
                      label="ZipCode"
                      validateStatus={errors.address?.zipcode ? "error" : undefined}
                      help={errors.address?.zipcode ? errors.address?.zipcode : null}
                    >
                      <Field type="text" name="address.zipcode" as={Input} />
                    </AntForm.Item>
                  </Flex>
                </Flex>
              </Flex>

              <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
                <Typography.Title level={3} style={{ alignSelf: "center" }}>
                  Latitude and Longitude
                </Typography.Title>
                <AntForm.Item>
                  <Space.Compact size="large">
                    <AntForm.Item
                      validateStatus={errors.address?.geo?.lat ? "error" : undefined}
                      help={errors.address?.geo?.lat ? errors.address?.geo?.lat : null}
                    >
                      <Field type="text" name="address.geo.lat" as={Input} prefix="latitude:" />
                    </AntForm.Item>

                    <AntForm.Item
                      validateStatus={errors.address?.geo?.lng ? "error" : undefined}
                      help={errors.address?.geo?.lng ? errors.address?.geo?.lng : null}
                    >
                      <Field type="text" name="address.geo.lng" as={Input} prefix="longitude:" />
                    </AntForm.Item>
                  </Space.Compact>
                </AntForm.Item>
              </Flex>

              <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
                <Typography.Title level={3}>Company info</Typography.Title>
                <Flex justify="center" align="center" gap="10px" style={{ flexDirection: "column" }}>
                  <AntForm.Item
                    label="Company name"
                    validateStatus={errors.company?.name ? "error" : undefined}
                    help={errors.company?.name ? errors.company?.name : null}
                  >
                    <Field type="text" name="company.name" as={Input} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Catch phrase"
                    validateStatus={errors.company?.catchPhrase ? "error" : undefined}
                    help={errors.company?.catchPhrase ? errors.company?.catchPhrase : null}
                  >
                    <Field type="text" name="company.catchPhrase" as={Input} />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Business Speak"
                    validateStatus={errors.company?.bs ? "error" : undefined}
                    help={errors.company?.bs ? errors.company?.bs : null}
                  >
                    <Field type="text" name="company.bs" as={Input.TextArea} />
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
              </Flex>
            </Form>
          )}
        </Formik>
      </div>
    )
  }

  return null
})
