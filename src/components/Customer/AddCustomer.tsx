import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { AddCustomerSchema } from "../../validationSchema/AddCustomerSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addCustomer,
  getAllCustomer,
} from "../../store/features/customer/customerSlice";
import { toast } from "react-toastify";

function AddCustomer() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.customer);

  const submit = async (values: any, action: any) => {
    try {
      const formData = {
        ...values,
        role: Number(values.role),
      };

      // dispatch ve asenkron işlemler
      await dispatch(addCustomer(formData)).unwrap();
      await dispatch(getAllCustomer());
      action.resetForm();

      // Not: Başarı bildirimi toast artık addCustomer thunk'ında yapılıyor
    } catch (error) {
      // Hata zaten axios interceptor tarafından işleniyor
      console.error("Form gönderiminde hata:", error);
    }
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
            disabled={loading}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="surname">Soyad</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Soyadınızı giriniz"
            id="surname"
            value={values.surname}
            onChange={handleChange}
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </form>
    </div>
  );
}
export default AddCustomer;
