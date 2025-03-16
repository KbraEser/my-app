import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  vatRate: number;
  categoryId: number;
  variants: [
    {
      id: number;
      productId: number;
      code: string;
      name: string;
      barcode: string;
      model: string;
      criticalStockLevel: number;
      imgUrl: string;
      isActive: boolean;
    }
  ];
  isActive: boolean;
  stoks: [
    {
      model: string;
      criticalStockLevel: number;
      stockQuantity: number;
    }
  ];
}

interface ProductResponse {
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  data: Product[];
}

const initialState = {
  products: [] as Product[],
  loading: false,
  error: null as string | null,
  meta: {
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: true,
    hasNextPage: true,
  },
};

export const addProduct = createAsyncThunk(
  "addProduct",
  async (
    productData: Omit<Product, "id" | "variants"> & {
      variants: Omit<Product["variants"][number], "id" | "productId">[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<Product>(
        "https://stok-api-66a9f6c2f630.herokuapp.com/Product",
        productData
      );
      toast.success("Ürün başarıyla eklendi");
      return response.data;
    } catch (error) {
      return rejectWithValue("Ürün eklenirken bir hata oluştu");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
