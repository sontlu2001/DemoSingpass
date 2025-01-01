import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  editingPost: null,
};


const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    deleteBlog: (state, action) => {
      const blogId = action.payload;
      const foundIndex = state.blogs.findIndex((blog) => blog.id === blogId);
      if (foundIndex !== -1) {
        state.blogs.splice(foundIndex, 1);
      }
    },
    startEditBlog: (state, action) => {
      const blogId = action.payload;
      const postItem = state.blogs.find((blog) => blog.id === blogId) || null;
      state.editingPost = postItem;
    },
    cancelEditBlog: (state) => {
      state.editingPost = null;
    },
    finishEditBlog: (state, action) => {
      const { id, title, content } = action.payload;
      state.blogs.some((blog) => {
        if (blog.id === id) {
          blog.title = title;
          blog.content = content;
          state.editingPost = null;
          return true;
        }
        return false;
      });
    },
    extraReducers(builder) {
      // Add reducers for additional action types here, and handle loading state as needed
        builder
          .addMatcher((action) => action.type.include('cancel'), (state, action) => {
            console.log('Fail action', action);
          })
    },
  },
});

export const { addBlog, deleteBlog, startEditBlog, cancelEditBlog, finishEditBlog } = blogSlice.actions;
const blogReducer = blogSlice.reducer;
export default blogReducer;
