import * as Yup from "yup";

export const loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .trim()
    .required("Required")
    .max(55)
    .lowercase(),
  password: Yup.string().required().max(20),
});
