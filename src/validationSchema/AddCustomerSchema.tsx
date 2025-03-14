import * as yup from "yup";

export const AddCustomerSchema = yup.object().shape({
  name: yup.string().required("Adınızı girmek zorunludur."),
  surname: yup.string().required("Soyadınızı girmek zorunludur."),
  email: yup
    .string()
    .email("Geçersiz email adresi")
    .required("Email adresinizi girmek zorunludur."),
});
