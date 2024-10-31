// redux
import { configureStore } from "@reduxjs/toolkit";

// features
import userReducer from "./features/userSlice";
import articleReducer from "./features/articleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
});
