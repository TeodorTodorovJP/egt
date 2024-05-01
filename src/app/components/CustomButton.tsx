import { Button } from "antd"

interface CustomButtonProps {
  onClick: () => void
  label?: string
  disabled?: boolean
}

export const CustomButton = ({ onClick, label, disabled }: CustomButtonProps) => {
  return (
    <Button htmlType="button" style={{ alignSelf: "end" }} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  )
}
