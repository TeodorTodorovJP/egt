import { Button as AntButton } from "antd"

export const Button = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
    <AntButton htmlType="button" style={{ alignSelf: "end" }} onClick={onClick}>
      {label}
    </AntButton>
  )
}
