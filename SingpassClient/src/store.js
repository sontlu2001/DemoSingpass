import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from './pages/blog/blog.reducer';
import blogReducer from "./pages/blog/blog.slice";
import { blogApi } from "./pages/blog/blog.service";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  // Thêm middleware để enable các tính năng caching, invalidation, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export default store;
