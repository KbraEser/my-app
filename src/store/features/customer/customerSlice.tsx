import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

interface CustomerResponse {
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  data: Customer[];
}

const initialState = {
  customers: [] as Customer[],
  selectedCustomer: {} as Customer,
  loading: false,
  meta: {
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const addCustomer = createAsyncThunk(
  "addCustomer",
  async (customerData: Omit<Customer, "id" | "createdOn">) => {
    const response = await axios.post(
      "https://stok-api-66a9f6c2f630.herokuapp.com/Customer",
      customerData
    );
    return response.data;
  }
);

export const getAllCustomer = createAsyncThunk("getAllCustomer", async () => {
  const response = await axios.get<CustomerResponse>(
    "https://stok-api-66a9f6c2f630.herokuapp.com/Customer"
  );
  return response.data;
});

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload.data;
      state.meta = action.payload.meta;
    });

    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCustomer.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
