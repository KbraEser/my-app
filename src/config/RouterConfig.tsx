import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CustomerList from "../components/Customer/CustomerList";
import ProductList from "../components/Product/ProductList";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
}

export default RouterConfig;
