import { Modal } from "antd"
import { useAppDispatch, useAppSelector } from "../hooks"
import { clearError, selectErrorMessage, selectShowErrorModal } from "../../errorSlice"

const ErrorModal = () => {
  const showErrorModal = useAppSelector(selectShowErrorModal)
  const errorMessage = useAppSelector(selectErrorMessage)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(clearError())
  }

  return (
    <Modal title="Error" open={showErrorModal} onCancel={handleClose} footer={null}>
      <p>{errorMessage}</p>
    </Modal>
  )
}

export default ErrorModal
