import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./ProductList.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();

  return (
    <div className="product-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="product-title">Ürün Yönetimi</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/products/add')}
        >
          Yeni Ürün Ekle
        </Button>
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
  );
}

export default ProductList;
