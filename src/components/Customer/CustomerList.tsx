import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../store/features/customer/customerSlice";
import { AppDispatch, RootState } from "../../store/store";
import Customer, { Customer as CustomerType } from "./Customer";
import AddCustomer from "./AddCustomer";
import "./CustomerList.scss";

function CustomerList() {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, loading } = useSelector(
    (state: RootState) => state.customer
  );

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  return (
    <>
      <div className="customer-list">
        <AddCustomer />
      </div>

      <div className="customer-information">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : customers && customers.length > 0 ? (
          customers.map((customer: CustomerType) => (
            <Customer key={customer.id} customer={customer} />
          ))
        ) : (
          <p>Henüz müşteri bulunmamaktadır.</p>
        )}
      </div>
    </>
  );
}

export default CustomerList;
