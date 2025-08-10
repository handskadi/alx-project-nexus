import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Product } from "@/lib/productsApi";
import type { RootState } from "@/lib/store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

const initialState: CartState = { items: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate: (_state, action: PayloadAction<CartState | undefined>) =>
      action.payload ?? initialState,
    addToCart: (state, action: PayloadAction<Product & { qty?: number }>) => {
      const { id, title, price, image } = action.payload;
      const qty = action.payload.qty ?? 1;
      const existing = state.items[id];
      state.items[id] = existing
        ? { ...existing, qty: existing.qty + qty }
        : { id, title, price, image, qty };
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      delete state.items[action.payload.id];
    },
    setQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const it = state.items[action.payload.id];
      if (!it) return;
      if (action.payload.qty <= 0) delete state.items[action.payload.id];
      else it.qty = action.payload.qty;
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart, hydrate } =
  cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (s: RootState) => s.cart.items;

export const selectCartCount = createSelector(selectCartItems, (items) =>
  Object.values(items).reduce((sum, it) => sum + it.qty, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  Object.values(items).reduce((sum, it) => sum + it.qty * it.price, 0)
);
