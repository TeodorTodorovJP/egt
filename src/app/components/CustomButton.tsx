import { Button as AntButton } from "antd"

interface CustomButtonProps {
  onClick: () => void
  label?: string
  disabled?: boolean
}

export const CustomButton = ({ onClick, label, disabled }: CustomButtonProps) => {
  return (
    <AntButton htmlType="button" style={{ alignSelf: "end" }} onClick={onClick} disabled={disabled}>
      {label}
    </AntButton>
  )
}
