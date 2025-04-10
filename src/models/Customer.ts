export interface CreateCustomer {
  Name: string;
  Surname: string;
  Address: string;
  Email: string;
  Phone: string;
  Role: UserRole;
  TaxNumber?: number;
}

export interface UpdateCustomer {
  Id: number;
  Name: string;
  Surname: string;
  Address: string;
  Email: string;
  Phone: string;
  Role: UserRole;
  TaxNumber?: number;
}

export interface Customer {
  id: number;
  name: string;
  surname: string;
  address: string;
  email: string;
  phone: string;
  role: UserRole;
  taxNumber?: number;
  createdOn: string;
}

export enum UserRole {
  Admin = 0,
  User = 1,
  Customer = 2,
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.Admin]: "Admin",
  [UserRole.User]: "Kullanıcı",
  [UserRole.Customer]: "Müşteri",
};

export const getDefaultCustomer = (): CreateCustomer => ({
  Name: "",
  Surname: "",
  Address: "",
  Email: "",
  Phone: "",
  Role: UserRole.User,
  TaxNumber: undefined,
});
