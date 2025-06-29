import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useFormik } from "formik";
import { AddProductSchema } from "../../validationSchema/AddproductSchema";
import {
  addProduct,
  addVariantToForm,
  removeVariantFromForm,
  resetFormState,
} from "../../store/features/productCategory/productSlice";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, formState } = useSelector(
    (state: RootState) => state.product
  );
  const navigate = useNavigate();

  const submit = async (formValues: any, actions: any) => {
    try {
      const formData = {
        name: formValues.name,
        description: formValues.description,
        price: Number(formValues.price),
        vatRate: Number(formValues.vatRate),
        categoryId: Number(formValues.categoryId),
        isActive: true,
        stoks: formValues.variants.map((variant: any) => ({
          model: variant.model,
          criticalStockLevel: Number(variant.criticalStockLevel),
          stockQuantity: 0
        })),
        variants: formValues.variants.map((variant: any) => ({
          code: variant.barcode,
          name: formValues.name,
          barcode: variant.barcode,
          model: variant.model,
          criticalStockLevel: Number(variant.criticalStockLevel),
          imgUrl: [""],
          isActive: variant.isActive
        }))
      };

      await dispatch(addProduct(formData)).unwrap();
      toast.success("Ürün başarıyla eklendi");
      navigate('/products');
      dispatch(resetFormState());
      actions.resetForm();
    } catch (error) {
      console.error("Form gönderiminde hata:", error);
      toast.error("Ürün eklenirken bir hata oluştu");
    }
  };

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        price: 0,
        vatRate: 0,
        categoryId: 0,
        variants: formState.variants,
      },
      validationSchema: AddProductSchema,
      onSubmit: submit,
      enableReinitialize: true,
    });

  const handleAddVariant = () => {
    dispatch(addVariantToForm());
  };

  const handleRemoveVariant = (index: number) => {
    dispatch(removeVariantFromForm(index));
  };

  const handleIsActiveChange = (index: number, checked: boolean) => {
    const newVariants = [...values.variants];
    newVariants[index] = {
      ...newVariants[index],
      isActive: checked,
    };
    setFieldValue("variants", newVariants);
  };

  return (
    <div className="product-form">
      <h3>Yeni Ürün Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ürün Adı</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Ürün adı giriniz"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(errors.name)}
            helperText={errors.name}
            margin="normal"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Ürün Açıklaması</label>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            placeholder="Ürün açıklaması giriniz"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(errors.description)}
            helperText={errors.description}
            margin="normal"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Ürün Fiyatı</label>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            placeholder="Ürün fiyatı giriniz"
            id="price"
            name="price"
            value={values.price}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(errors.price)}
            helperText={errors.price}
            margin="normal"
          />
        </div>
        <div className="form-group">
          <label htmlFor="vatRate">Ürün KDV Oranı</label>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            placeholder="Ürün kdv oranı giriniz"
            id="vatRate"
            name="vatRate"
            value={values.vatRate}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(errors.vatRate)}
            helperText={errors.vatRate}
            margin="normal"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Kategori ID</label>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            placeholder="Kategori ID giriniz"
            id="categoryId"
            name="categoryId"
            value={values.categoryId}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(errors.categoryId)}
            helperText={errors.categoryId}
            margin="normal"
          />
        </div>

        <h4>Varyant Bilgileri</h4>

        {values.variants.map((variant, index) => (
          <div
            key={index}
            className="variant-section"
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h5>Varyant #{index + 1}</h5>
              {values.variants.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveVariant(index)}
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`variants[${index}].model`}>Model</label>
              <TextField
                fullWidth
                variant="standard"
                type="text"
                placeholder="Model bilgisi giriniz"
                id={`variants[${index}].model`}
                name={`variants[${index}].model`}
                value={variant.model}
                onChange={handleChange}
                disabled={loading}
                error={Boolean(
                  errors.variants?.[index] &&
                    typeof errors.variants[index] === "object" &&
                    "model" in errors.variants[index]
                )}
                helperText={
                  typeof errors.variants?.[index] === "object" &&
                  "model" in errors.variants[index]
                    ? (errors.variants[index].model as string)
                    : ""
                }
                margin="normal"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`variants[${index}].barcode`}>Barkod</label>
              <TextField
                fullWidth
                variant="standard"
                type="text"
                placeholder="Barkod bilgisi giriniz"
                id={`variants[${index}].barcode`}
                name={`variants[${index}].barcode`}
                value={variant.barcode}
                onChange={handleChange}
                disabled={loading}
                error={Boolean(
                  errors.variants?.[index] &&
                    typeof errors.variants[index] === "object" &&
                    "barcode" in errors.variants[index]
                )}
                helperText={
                  typeof errors.variants?.[index] === "object" &&
                  "barcode" in errors.variants[index]
                    ? (errors.variants[index].barcode as string)
                    : ""
                }
                margin="normal"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`variants[${index}].criticalStockLevel`}>
                Kritik Stok Seviyesi
              </label>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                placeholder="Kritik stok seviyesi giriniz"
                id={`variants[${index}].criticalStockLevel`}
                name={`variants[${index}].criticalStockLevel`}
                value={variant.criticalStockLevel}
                onChange={handleChange}
                disabled={loading}
                error={Boolean(
                  errors.variants?.[index] &&
                    typeof errors.variants[index] === "object" &&
                    "criticalStockLevel" in errors.variants[index]
                )}
                helperText={
                  typeof errors.variants?.[index] === "object" &&
                  "criticalStockLevel" in errors.variants[index]
                    ? (errors.variants[index].criticalStockLevel as string)
                    : ""
                }
                margin="normal"
              />
            </div>

            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={variant.isActive}
                    onChange={(e) =>
                      handleIsActiveChange(index, e.target.checked)
                    }
                    name={`variants[${index}].isActive`}
                    color="primary"
                    disabled={loading}
                  />
                }
                label="Aktif"
              />
            </div>
          </div>
        ))}

        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          color="primary"
          onClick={handleAddVariant}
          disabled={loading}
          style={{ marginBottom: "20px" }}
        >
          Yeni Varyant Ekle
        </Button>

        <div className="form-actions">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? "Ekleniyor..." : "Ürün Ekle"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
