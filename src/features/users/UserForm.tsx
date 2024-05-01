import { UserOutlined } from "@ant-design/icons"
import { Form as AntForm, Button, Flex, Input, Space, Spin, Typography } from "antd"
import { Field, Form, Formik, type FormikHelpers } from "formik"
import { memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CustomButton } from "../../app/components/CustomButton"
import { FormField } from "../../app/components/FormField"
import { useAppDispatch } from "../../app/hooks"
import { setError } from "../../errorSlice"
import { useGetUserQuery, useUpdateUserMutation, type UserType } from "./usersApiSlice"
import userSchema from "./validationSchema"

export const UserForm = memo(({ userId }: { userId: string }) => {
  const { data: user, isError, isLoading } = useGetUserQuery(userId)
  const [updateUser, mutationState] = useUpdateUserMutation()
  const location = useLocation()
  const dispatch = useAppDispatch()

  /** Access Router */
  const navigate = useNavigate()
  const usersScreen = location.pathname === "/"

  const onSubmit = (values: UserType, formikHelpers: FormikHelpers<UserType>) => {
    updateUser(values)
    formikHelpers.setSubmitting(false)
  }

  // Not tested
  if (isError || mutationState.isError) {
    dispatch(setError("An error occurred: " + mutationState.isError))
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading || mutationState.isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    )
  }

  if (!user) {
    return (
      <div>
        <h1>No data for that user!</h1>
      </div>
    )
  }

  if (user) {
    return (
      <div style={{ position: "relative" }}>
        <Flex justify="center" align="center" style={{ flexDirection: "column", position: "relative" }}>
          {usersScreen && <CustomButton onClick={() => navigate(`/posts/${user.id}`)} label="See posts" />}
          {!usersScreen && <CustomButton onClick={() => navigate(-1)} label="Go back" />}

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
          {({ isSubmitting, dirty, errors, handleReset, isValid }) => (
            <Form>
              <Flex justify="center" align="center" gap="10px">
                <Flex style={{ flexDirection: "column" }}>
                  <Typography.Title level={3}>Account info</Typography.Title>

                  <FormField name="id" label="User ID" error={errors.name} disabled />
                  <FormField name="name" label="Personal Name" error={errors.name} prefix={<UserOutlined />} />
                  <FormField name="username" label="User Name" error={errors.username} />
                </Flex>

                <Flex style={{ flexDirection: "column" }}>
                  <Typography.Title level={3}>Contacts</Typography.Title>

                  <FormField name="email" label="E-mail" error={errors.email} />

                  <FormField name="phone" label="Phone" error={errors.phone} />

                  <FormField name="website" label="Website" error={errors.website} />
                </Flex>
              </Flex>

              <Flex style={{ flexDirection: "column" }}>
                <Typography.Title level={3} style={{ alignSelf: "center" }}>
                  Address
                </Typography.Title>

                <Flex justify="center" align="center" gap="10px">
                  <Flex style={{ flexDirection: "column" }}>
                    <FormField name="address.street" label="Street" error={errors.address?.street} />
                    <FormField name="address.suite" label="Suite" error={errors.address?.suite} />
                  </Flex>

                  <Flex style={{ flexDirection: "column" }}>
                    <FormField name="address.city" label="City" error={errors.address?.city} />
                    <FormField name="address.zipcode" label="ZipCode" error={errors.address?.zipcode} />
                  </Flex>
                </Flex>
              </Flex>

              <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
                <Typography.Title level={3} style={{ alignSelf: "center" }}>
                  Latitude and Longitude
                </Typography.Title>
                <AntForm.Item>
                  <Space.Compact size="large">
                    <FormField name="address.geo.lat" error={errors.address?.geo?.lat} prefix="latitude:" />
                    <FormField name="address.geo.lng" error={errors.address?.geo?.lng} prefix="longitude:" />
                  </Space.Compact>
                </AntForm.Item>
              </Flex>

              <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
                <Typography.Title level={3}>Company info</Typography.Title>
                <Flex justify="center" align="center" gap="10px" style={{ flexDirection: "column" }}>
                  <FormField name="company.name" label="Company name" error={errors.company?.name} />

                  <AntForm.Item
                    label="Catch phrase"
                    validateStatus={errors.company?.catchPhrase ? "error" : undefined}
                    help={errors.company?.catchPhrase ? errors.company?.catchPhrase : null}
                  >
                    <Field type="text" name="company.catchPhrase" as={Input.TextArea} />
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
                <Button htmlType="submit" disabled={isSubmitting || !dirty || !isValid} type="primary">
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
})
