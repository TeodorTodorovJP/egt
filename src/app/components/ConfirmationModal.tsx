import { Modal } from "antd"

interface ConfirmationModalProps {
  onConfirm: () => void
  onCancel?: () => void
  open?: boolean
}

const ConfirmationModal = ({ open, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <Modal title="Confirmation" open={open} onOk={onConfirm} onCancel={onCancel}>
      <p>Are you sure you want to delete?</p>
    </Modal>
  )
}

export default ConfirmationModal
