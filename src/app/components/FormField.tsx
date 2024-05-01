import { Form, Input } from "antd"
import { Field } from "formik"

interface FormFieldProps {
  name: string
  error?: string | undefined
  label?: string
  prefix?: JSX.Element | string
  disabled?: boolean
}

export function FormField({ error, label, name, prefix, disabled }: FormFieldProps): JSX.Element {
  return (
    <Form.Item label={label} validateStatus={error ? "error" : undefined} help={error ? error : null}>
      <Field type="text" name={name} as={Input} prefix={prefix} disabled={disabled} />
    </Form.Item>
  )
}

export default FormField
