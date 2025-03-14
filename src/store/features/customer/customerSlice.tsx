import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
  error: null as string | null,
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
  async (
    customerData: Omit<Customer, "id" | "createdOn">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://stok-api-66a9f6c2f630.herokuapp.com/Customer",
        customerData
      );
      toast.success("Müşteri başarıyla eklendi");
      return response.data;
    } catch (error) {
      return rejectWithValue("Müşteri eklenirken bir hata oluştu");
    }
  }
);

export const getAllCustomer = createAsyncThunk(
  "getAllCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CustomerResponse>(
        "https://stok-api-66a9f6c2f630.herokuapp.com/Customer"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Müşteri listelenirken bir hata oluştu");
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://stok-api-66a9f6c2f630.herokuapp.com/Customer/${id}`
      );
      toast.success("Müşteri başarıyla silindi");
      return id;
    } catch (error) {
      return rejectWithValue("Müşteri silinirken bir hata oluştu");
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
      toast.info("Müşteri listeleniyor...");
    });

    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload.data;
      state.meta = action.payload.meta;
    });

    builder.addCase(getAllCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addCustomer.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
