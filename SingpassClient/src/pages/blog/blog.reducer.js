import { createAction, createReducer } from "@reduxjs/toolkit";


const initialState = {
  blogs: [],
  editingPost: null,
}; 

export const addBlog = createAction("blog/addBlog");
export const deleteBlog = createAction("blog/deleteBlog");
export const startEditBlog = createAction("blog/editBlog");
export const cancelEditBlog = createAction("blog/cancelEditBlog");
export const finishEditBlog = createAction("blog/finishEditBlog")

// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addBlog, (state, action) => {
//       state.blogs.push(action.payload);
//     })
//     .addCase(deleteBlog, (state, action) => {
//       const blogId = action.payload;
//       const foundIndex = state.blogs.findIndex((blog) => blog.id === blogId);
//       if (foundIndex !== -1) {
//         state.blogs.splice(foundIndex, 1);
//       }
//     })
//     .addCase(startEditBlog, (state, action) => {
//       const blogId = action.payload;
//       const postItem = state.blogs.find((blog) => blog.id === blogId) || null;
//       console.log(blogId);
//         state.editingPost = postItem;
//     })
//     .addCase(cancelEditBlog, (state) => {
//       state.editingPost = null;
//     })
//     .addCase(finishEditBlog, (state, action) => {
//       const { id, title, content } = action.payload;
//       state.blogs.some((blog) => {
//         if (blog.id === id) {
//           blog.title = title;
//           blog.content = content;
//           state.editingPost = null;
//           return true;
//         }
//         return false;
//       });
//     })
//    // ngoài ra còn có thể  sử dụng addMatcher để xử lý các action khác.
//    // nếu matcher trả về true thì sẽ thực thi action đó
//    // addMatcher((action) => action.type.endsWith('fail'), (state, action) => {
//    //   console.log('Fail action', action);
//    // })
// });


const blogReducer = createReducer(initialState, {
    [addBlog]: (state, action) => {
      state.blogs.push(action.payload);
    },
    [deleteBlog]: (state, action) => {
      const blogId = action.payload;
      const foundIndex = state.blogs.findIndex((blog) => blog.id === blogId);
      if (foundIndex !== -1) {
        state.blogs.splice(foundIndex, 1);
      }
    },
    [startEditBlog]: (state, action) => {
      const blogId = action.payload;
      const postItem = state.blogs.find((blog) => blog.id === blogId) || null;
      console.log(blogId);
        state.editingPost = postItem;
    },
    [cancelEditBlog]: (state) => {
      state.editingPost = null;
    },
    [finishEditBlog]: (state, action) => {
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
    }
});    


export default blogReducer;
