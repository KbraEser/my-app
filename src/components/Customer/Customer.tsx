import React from "react";

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
  const { name, surname, email, phone, address, taxNumber, role, createdOn } =
    customer;

  return (
    <div>
      <h3>
        {name} {surname}
      </h3>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{address}</p>
      <p>{taxNumber}</p>
      <p>{role}</p>
      <p>{createdOn}</p>
    </div>
  );
}

export default Customer;
