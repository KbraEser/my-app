import React from "react";
import CustomerList from "../components/Customer/CustomerList";
import ProductList from "../components/Product/ProductList";

function Home() {
  return (
    <div>
      <CustomerList />
      <ProductList />
    </div>
  );
}

export default Home;
