import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/app/appSlice";
import customerReducer from "./features/customer/customerSlice";
import productReducer from "./features/productCategory/productSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    customer: customerReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
