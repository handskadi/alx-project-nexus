import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/lib/productsApi";
import catalogReducer from "@/lib/slices/catalogSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
