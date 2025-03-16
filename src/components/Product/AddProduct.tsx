import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useFormik } from "formik";

function AddProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.product);

  const {} = useFormik({
    initialValues: {},
  });

  return <div>AddProduct</div>;
}

export default AddProduct;
