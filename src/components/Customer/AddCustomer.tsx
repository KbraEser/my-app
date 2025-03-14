import { useFormik } from "formik";
import { Alert, Snackbar, TextField } from "@mui/material";
import { AddCustomerSchema } from "../../validationSchema/AddCustomerSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  addCustomer,
  getAllCustomer,
} from "../../store/features/customer/customerSlice";
import { useState } from "react";

function AddCustomer() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const submit = async (values: any, action: any) => {
    try {
      const formData = {
        ...values,
        role: Number(values.role),
      };

      await dispatch(addCustomer(formData));
      await dispatch(getAllCustomer());
      action.resetForm();

      setMessage("Müşteri başarıyla eklendi!");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.error("Müşteri eklenirken bir hata oluştu:", error);
      setMessage("Müşteri eklenirken bir hata oluştu");
      setSeverity("error");
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      taxNumber: "",
      role: 0,
    },
    validationSchema: AddCustomerSchema,
    onSubmit: submit,
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ad</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Adınızı giriniz"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="surname ">Soyad</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Soyadınızı giriniz"
            id="surname"
            value={values.surname}
            onChange={handleChange}
          />
          {errors.surname && <p style={{ color: "red" }}>{errors.surname}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <TextField
            fullWidth
            variant="standard"
            type="email"
            placeholder="Email adresinizi giriniz"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Telefon numaranızı giriniz"
            id="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Adres</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Adresinizi giriniz"
            id="address"
            value={values.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="taxNumber">Vergi Numarası</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Vergi numaranızı giriniz"
            id="taxNumber"
            value={values.taxNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Rolünüzü giriniz"
            id="role"
            value={values.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ekle</button>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default AddCustomer;
