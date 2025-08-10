import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/lib/productsApi";
import catalogReducer from "@/lib/slices/catalogSlice";
import cartReducer from "@/lib/slices/cartSlice";
import wishlistReducer from "@/lib/slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
