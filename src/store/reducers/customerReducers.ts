import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../models/Customer";
import { GenericPagedResponse } from "../../models/GenericPagedResponse";
import { GenericResponse } from "../../models/GenericResponse";
import { isGenericResponseString } from "./helper";
import { ValidationErrorDTO } from "../../models/ValidationErrorDTO";

interface CustomerState {
  list: Customer[]; // Liste ayrı tutulmalı
  loading: boolean;
  error: string | null;
  validationError: ValidationErrorDTO | null;
  totalCount: number | null;
  searchQuery: string;
  page: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
}

const initialState: CustomerState = {
  list: [],
  loading: true,
  error: null,
  validationError: null,
  totalCount: 0,
  searchQuery: "",
  page: 0,
  pageSize: 5,
  sortField: "id",
  sortDirection: "asc",
};

// Hata yönetimi için yardımcı fonksiyon
const handleFailure = (
  state: CustomerState,
  action: PayloadAction<
    GenericResponse<string> | GenericResponse<ValidationErrorDTO>
  >
) => {
  state.loading = false;
  if (
    action.payload.data &&
    typeof action.payload.data !== "string" &&
    "errors" in action.payload.data
  ) {
    state.validationError = action.payload.data;
    state.error = action.payload.message || null;
  }
  if (action.payload.data && isGenericResponseString(action.payload.data)) {
    state.error = action.payload.message || null;
  }
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerSearchQuery(state, action) {
      state.searchQuery = action.payload; // Customer arama durumu
    },
    setSortModel(
      state,
      action: PayloadAction<{ sortField: string; sortDirection: string }>
    ) {
      state.sortField = action.payload.sortField;
      state.sortDirection = action.payload.sortDirection;
    },
    setPaginationModel(
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    fetchCustomersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess: (
      state,
      action: PayloadAction<GenericPagedResponse<Customer>>
    ) => {
      if ("meta" in action.payload) {
        state.list = action.payload.data;
        state.totalCount = action.payload.meta.totalCount;
      } else {
        state.error = "Müşteri verileri alınamadı";
      }
      state.loading = false;
    },
    fetchCustomersFailure: (
      state,
      action: PayloadAction<
        GenericResponse<string> | GenericResponse<ValidationErrorDTO>
      >
    ) => {
      handleFailure(state, action);
    },
    addCustomerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCustomerSuccess: (
      state,
      action: PayloadAction<GenericResponse<Customer>>
    ) => {
      state.loading = false;
      if (action.payload.data) {
        state.list = [...state.list, action.payload.data];
      }
    },
    addCustomerFailure: (
      state,
      action: PayloadAction<
        GenericResponse<string> | GenericResponse<ValidationErrorDTO>
      >
    ) => {
      handleFailure(state, action);
    },
    deleteCustomerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCustomerSuccess: (
      state,
      action: PayloadAction<GenericResponse<string>>
    ) => {
      state.loading = false;
      state.list = state.list.filter(
        (customer) => customer.id.toString() !== action.payload.data
      );
    },
    deleteCustomerFailure: (
      state,
      action: PayloadAction<GenericResponse<string>>
    ) => {
      state.loading = false;
      state.error = action.payload.message || null;
    },
    clearValidationErrors: (state) => {
      state.validationError = null;
    },
    updateCustomerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCustomerSuccess: (
      state,
      action: PayloadAction<
        | GenericResponse<Customer>
        | GenericResponse<ValidationErrorDTO>
        | GenericResponse<string>
      >
    ) => {
      state.loading = false;
      if (
        action.payload.data &&
        typeof action.payload.data !== "string" &&
        "errors" in action.payload.data
      ) {
        state.validationError = action.payload.data;
        state.error = action.payload.message || null;
      }

      if (action.payload.data && isGenericResponseString(action.payload.data)) {
        state.error = action.payload.message || null;
      }
      if (
        action.payload.data &&
        typeof action.payload.data === "object" &&
        "id" in action.payload.data
      ) {
        const updatedCustomer = action.payload.data;
        state.list = state.list.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
      }
    },
    updateCustomerFailure: (
      state,
      action: PayloadAction<
        GenericResponse<string> | GenericResponse<ValidationErrorDTO>
      >
    ) => {
      handleFailure(state, action);
    },
  },
});

export const {
  setSortModel,
  setPaginationModel,
  setCustomerSearchQuery,
  fetchCustomersRequest,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  addCustomerRequest,
  addCustomerSuccess,
  addCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  clearValidationErrors,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure,
} = customerSlice.actions;

export default customerSlice.reducer;
