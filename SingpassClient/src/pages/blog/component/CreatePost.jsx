import { useDispatch, useSelector } from "react-redux";
// import { addBlog, cancelEditBlog, finishEditBlog } from "../blog.reducer";
import { addBlog, cancelEditBlog, finishEditBlog } from "../blog.slice";
import { useEffect, useState } from "react";

const initFormData = {
  title: "",
  content: "",
  id: "",
};

export default function CreatePost() {
  const [formData, setFormData] = useState(initFormData);
  const dispath = useDispatch();
  const editingPost = useSelector((state) => state.blog.editingPost);

  useEffect(() => {
    if (editingPost) {
      setFormData(editingPost);
    }
  }, [editingPost]);

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.content.trim() === "") {
      return;
    }

    if (editingPost) {
      dispath(finishEditBlog(formData));
      setFormData(initFormData);
    } else {
      dispath(addBlog({ ...formData, id: new Date().getTime() }));
      setFormData(initFormData);
    }
  };

  const handleCancelEditing = () => {
    dispath(cancelEditBlog());
    setFormData(initFormData);
  };

  return (
    <div>
      <form onSubmit={handleSubmitBlog} onReset={handleCancelEditing}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            value={formData.title}
            type="text"
            className="block border border-gray-300 w-2/3 p-2 rounded-md outline-none focus:border-blue-500"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            id="title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            value={formData.content}
            className="block border border-gray-300 w-2/3 p-2 rounded-md outline-none focus:border-blue-500"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            name=""
            id="content"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          {editingPost && (
            <>
              <button className="p-3 mt-3 text-white bg-red-500" type="reset">
                Cancel
              </button>
              <button
                className="ml-3 p-3 mt-3 text-white bg-green-500"
                type="submit"
              >
                Update
              </button>
            </>
          )}
          {!editingPost && (
            <button
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus-within:ring-blue-300 group-hover:from-purple-600 group-hover:500 dark:text-white dark:focus:ring-blue-800"
              type="submit"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-none duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Create Post
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
