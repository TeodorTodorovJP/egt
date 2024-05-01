import { Form, Input } from "antd"
import { Field } from "formik"

interface FormTextAreaProps {
  name: string
  error?: string | undefined
  label?: string
}

export function FormTextArea({ error, label, name }: FormTextAreaProps): JSX.Element {
  return (
    <div>
      <Form.Item label={label} validateStatus={error ? "error" : undefined} help={error ? error : null}>
        <Field
          type="text"
          name={name}
          as={Input.TextArea}
          autoSize={{ minRows: 2, maxRows: 6 }}
          variant="filled"
          style={{ width: "92vw" }}
        />
      </Form.Item>
    </div>
  )
}

export default FormTextArea
