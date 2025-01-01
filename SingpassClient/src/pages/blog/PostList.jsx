import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, startEditBlog } from "./blog.reducer";

import { deleteBlog, startEditBlog } from "./blog.slice";
import CreatePost from "./component/CreatePost";
import PostItem from "./component/PostItem";
import { useGetBlogsQuery } from "./blog.service";

export default function PostList() {
  const postList = useSelector((state) => state.blog.blogs);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleStartEditing = (id) => {
    dispatch(startEditBlog(id));
  }

  // Integrate the API getPosts
  const {data, isLoading, isFetching} = useGetBlogsQuery();

  return (
    <>
      <CreatePost />
      <div className="bg-white py-6 sm">
        <h2>Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postList.map((post) => (
            <PostItem key={post.id} 
            post={post} 
            handleDelete={handleDelete} 
            handleStartEditing={handleStartEditing}
            />
          ))}
        </div>
      </div>
    </>
  );
}
