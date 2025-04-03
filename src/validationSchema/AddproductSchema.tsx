import * as yup from "yup";

export const AddProductSchema = yup.object().shape({
  name: yup.string().required("Ürün adını girmek zorunludur."),
  description: yup.string().required("Ürün açıklamasını girmek zorunludur."),
  price: yup.number().required("Ürün fiyatını girmek zorunludur."),
  vatRate: yup.number().required("Ürün kdv oranını girmek zorunludur."),
  variants: yup.array().of(
    yup.object().shape({
      code: yup.string().required("Ürün kodunu girmek zorunludur."),
      name: yup.string().required("Ürün adını girmek zorunludur."),
      barcode: yup.string().required("Ürün barkodunu girmek zorunludur."),
      model: yup.string().required("Ürün modelini girmek zorunludur."),
      criticalStockLevel: yup
        .number()
        .required("Kritik stok seviyesini girmek zorunludur."),
    })
  ),
});
