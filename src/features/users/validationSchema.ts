import * as Yup from "yup"

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

//Required fields: username, email, address.street, address.suite, and address.city
const userSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(30, "Too Long!"),
  username: Yup.string().min(2, "Too Short!").max(30, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().matches(/^\d{5}(-\d{4})?$/, "Please enter a number in the format XXX-XXX-XXXX"),
    suite: Yup.string().min(2, "Too Short!").max(30, "Too Long!"),
    geo: Yup.object().shape({
      lat: Yup.number().max(90, "Must be less than or equal to 90").min(-90, "Must be more than or equal to -90"),
      lng: Yup.number().max(180, "Must be less than or equal to 180").min(-180, "Must be more than or equal to -180"),
    }),
  }),
  phone: Yup.string().min(4, "Too Short!"),
  website: Yup.string().matches(urlRegex, "Please enter a valid website URL"),
  company: Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(30, "Too Long!"),
    catchPhrase: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    bs: Yup.string().min(10, "Business Speak too Short!").max(100, "Business Speak too Long!"),
  }),
})
export default userSchema
