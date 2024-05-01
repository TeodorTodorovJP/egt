import * as Yup from "yup"

const userSchema = Yup.object().shape({
  title: Yup.string().min(2, "At least 2 characters!").max(80, "No more than 80 characters!").required("Required"),
  body: Yup.string().min(10, "At least 10 characters!").max(250, "No more than 250 characters!").required("Required"),
})
export default userSchema
