// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: [],
  filteredArticle: [],
  selectedCategory: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, { payload }) => {
      state.article = payload.data;
      state.filteredArticle = payload.data;
    },
    setCategories: (state, { payload }) => {
      state.selectedCategory = payload;
      state.article = state.filteredArticle.filter(
        (obj) => obj.category === payload,
      );
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
      state.article = state.filteredArticle;
    },
  },
});

export const { setArticles, setCategories, clearCategory } =
  articleSlice.actions;

export default articleSlice.reducer;
