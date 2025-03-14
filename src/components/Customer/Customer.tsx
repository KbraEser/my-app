import React from "react";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../store/features/customer/customerSlice";
import { AppDispatch } from "../../store/store";

export interface Customer {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  role: number;
  createdOn: string;
}

interface CustomerProps {
  customer: Customer;
}

function Customer({ customer }: CustomerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    id,
    name,
    surname,
    email,
    phone,
    address,
    taxNumber,
    role,
    createdOn,
  } = customer;

  const handleDelete = () => {
    if (
      window.confirm(
        `${name} ${surname} isimli müşteriyi silmek istediğinize emin misiniz?`
      )
    ) {
      dispatch(deleteCustomer(id))
        .unwrap()
        .catch((err: any) => {
          // Hata zaten axios interceptor tarafından işleniyor
          console.error("Müşteri silinirken bir hata oluştu:", err);
        });
    }
  };

  return (
    <div className="customer-card">
      <h3>
        {name} {surname}
      </h3>
      <p>
        <strong>E-posta:</strong> {email}
      </p>
      <p>
        <strong>Telefon:</strong> {phone}
      </p>
      <p>
        <strong>Adres:</strong> {address}
      </p>
      <p>
        <strong>Vergi No:</strong> {taxNumber}
      </p>
      <p>
        <strong>Rol:</strong> {role}
      </p>
      <p>
        <strong>Oluşturulma:</strong>{" "}
        {new Date(createdOn).toLocaleDateString("tr-TR")}
      </p>

      <div className="customer-actions">
        <button className="edit-btn">Düzenle</button>
        <button className="delete-btn" onClick={handleDelete}>
          Sil
        </button>
      </div>
    </div>
  );
}

export default Customer;
