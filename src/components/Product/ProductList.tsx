import React from "react";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./ProductList.scss";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.product);

  return (
    <>
      <div className="product-container">
        <h2 className="product-title">Ürün Yönetimi</h2>

        <div className="product-form-section">
          <h3>Yeni Ürün Ekle</h3>
          <AddProduct />
        </div>

        <div className="product-list-section">
          <h3>Ürün Listesi</h3>
          {loading ? (
            <p>Ürünler yükleniyor...</p>
          ) : (
            <div className="product-grid">
              <p>Ürün listesi burada gösterilecek</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
