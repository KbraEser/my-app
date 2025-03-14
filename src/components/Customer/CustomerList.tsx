import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../store/features/customer/customerSlice";
import { AppDispatch, RootState } from "../../store/store";
import Customer, { Customer as CustomerType } from "./Customer";
import AddCustomer from "./AddCustomer";
import "./CustomerList.scss";
import { toast } from "react-toastify";

function CustomerList() {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, loading, error } = useSelector(
    (state: RootState) => state.customer
  );

  useEffect(() => {
    dispatch(getAllCustomer())
      .unwrap()
      .catch((err) => {
        // API hataları zaten axios interceptor'da ele alınıyor,
        // burada özel işlemler yapabilirsiniz
      });
  }, [dispatch]);

  // Kullanıcıya veri yenileme imkanı sunalım
  const handleRefresh = () => {
    toast.info("Müşteri listesi yenileniyor...");
    dispatch(getAllCustomer());
  };

  return (
    <>
      <div className="customer-list">
        <AddCustomer />
      </div>

      <div className="customer-information">
        <div className="customer-header">
          <h2>Müşteri Listesi</h2>
          <button onClick={handleRefresh} disabled={loading}>
            Yenile
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <p>Yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Müşteri listesi yüklenirken bir hata oluştu.</p>
            <button onClick={handleRefresh}>Tekrar Dene</button>
          </div>
        ) : customers && customers.length > 0 ? (
          <div className="customers-grid">
            {customers.map((customer: CustomerType) => (
              <Customer key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Henüz müşteri bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerList;
