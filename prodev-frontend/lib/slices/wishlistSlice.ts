import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { Product } from "@/lib/productsApi";

export type WishItem = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type WishlistState = {
  items: Record<string, WishItem>;
};

const initialState: WishlistState = { items: {} };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist: (
      _state,
      action: PayloadAction<WishlistState | undefined>
    ) => action.payload ?? initialState,

    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const { id, title, price, image } = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      } else {
        state.items[id] = { id, title, price, image };
      }
    },

    removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
      delete state.items[action.payload.id];
    },

    clearWishlist: (state) => {
      state.items = {};
    },
  },
});

export const {
  hydrateWishlist,
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// selectors
export const selectWishlistMap = (s: RootState) => s.wishlist.items;
export const selectWishlistCount = createSelector(
  selectWishlistMap,
  (map) => Object.keys(map).length
);
export const selectIsWished = (id: string) => (s: RootState) =>
  Boolean(s.wishlist.items[id]);
