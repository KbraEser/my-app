import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/app/appSlice";
import customerReducer from "./features/customer/customerSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
