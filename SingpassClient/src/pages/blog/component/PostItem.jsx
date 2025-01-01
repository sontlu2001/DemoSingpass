export default function PostItem({ post, handleDelete, handleStartEditing }) {
  return (
    <div className="bg-white p-4 shadow-lg">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p>{post.content}</p>
      <button className="p-2 border bg-red-500 text-white" onClick={() => handleDelete(post.id)}>Remove</button>
      <button className="p-2 border bg-green-500 text-white" onClick={() => handleStartEditing(post.id)}>Edit</button>
    </div>
  );
}
