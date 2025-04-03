import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Kendi varyant tipimizi tanımlayalım
export interface Variant {
  model: string;
  barcode: string;
  imageUrl: string[];
  criticalStockLevel: number;
  isActive: boolean;
}

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
      imgUrl: string[];
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

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  // Form durumu için alan ekledik
  formState: {
    variants: Variant[];
  };
}

const initialState: ProductState = {
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
  formState: {
    variants: [
      {
        model: "",
        barcode: "",
        imageUrl: [""],
        criticalStockLevel: 0,
        isActive: true,
      },
    ],
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

export const getAllProduct = createAsyncThunk(
  "getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProductResponse>(
        "https://stok-api-66a9f6c2f630.herokuapp.com/Product"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ürün listelenirken bir hata oluştu");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addVariantToForm: (state) => {
      const emptyVariant: Variant = {
        model: "",
        barcode: "",
        imageUrl: [""],
        criticalStockLevel: 0,
        isActive: true,
      };
      state.formState.variants.push(emptyVariant);
    },

    removeVariantFromForm: (state, action: PayloadAction<number>) => {
      if (state.formState.variants.length > 1) {
        state.formState.variants.splice(action.payload, 1);
      }
    },

    resetFormState: (state) => {
      state.formState = {
        variants: [
          {
            model: "",
            barcode: "",
            imageUrl: [""],
            criticalStockLevel: 0,
            isActive: true,
          },
        ],
      };
    },
  },
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

    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.data;
      state.meta = action.payload.meta;
    });

    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addVariantToForm, removeVariantFromForm, resetFormState } =
  productSlice.actions;
export default productSlice.reducer;
