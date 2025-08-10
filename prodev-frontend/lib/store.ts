import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/lib/productsApi";
import catalogReducer from "@/lib/slices/catalogSlice";
import cartReducer from "@/lib/slices/cartSlice"; // <-- add

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer, // <-- add
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
