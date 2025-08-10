import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CatalogState = {
  page: number;
  limit: number;
  sort: "price_asc" | "price_desc";
  category: string | null;
};

const initialState: CatalogState = {
  page: 1,
  limit: 12,
  sort: "price_asc",
  category: null,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setPage: (s, a: PayloadAction<number>) => {
      s.page = a.payload;
    },
    setSort: (s, a: PayloadAction<CatalogState["sort"]>) => {
      s.sort = a.payload;
      s.page = 1;
    },
    setCategory: (s, a: PayloadAction<string | null>) => {
      s.category = a.payload;
      s.page = 1;
    },
  },
});

export const { setPage, setSort, setCategory } = catalogSlice.actions;
export default catalogSlice.reducer;
