
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CustomerList from "../components/Customer/CustomerList";
import ProductList from "../components/Product/ProductList";
import AddProduct from "../components/Product/AddProduct";
import { Customer } from "../components/Customer/Customer";

function RouterConfig() {
  const handleUpdateCustomer = (customer: Customer) => {
    // TODO: Implement customer update logic
    
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<CustomerList handleUpdateCustomer={handleUpdateCustomer} />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<AddProduct />} />
    </Routes>
  );
}

export default RouterConfig;
