import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThreadById, updateThread, deleteThread, getComments, addComment } from "../services/api";
import "./ThreadDetailPage.css";

function ThreadDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [thread, setThread] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", category: "", tags: "", createdBy: "" });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchThread();
    fetchComments();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await getThreadById(id);
      setThread(res.data);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        category: res.data.category,
        tags: res.data.tags.join(", "),
        createdBy: res.data.createdBy,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComments(id);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateThread(id, { 
        title: formData.title, 
        description: formData.description, 
        category: formData.category, 
        tags: formData.tags.split(",").map(tag => tag.trim()) 
      });
      setEditing(false);
      fetchThread();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this thread?")) {
      await deleteThread(id);
      navigate("/");
    }
  };

  const handleAddComment = async () => {
    if (!commentText) return;
    try {
      await addComment(id, { text: commentText, author: commentAuthor || "Anonymous" });
      setCommentText("");
      setCommentAuthor("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (!thread) return <p>Loading...</p>;

  return (
    <div className="thread-detail-container">
      {!editing ? (
        <div className="thread-detail-card">
          <h2>{thread.title}</h2>
<div className="thread-meta">
  <span className="author">{thread.createdBy}</span>
  <span className="dot">•</span>
  <small>{new Date(thread.createdAt).toLocaleString()}</small>
</div>
          <p>{thread.description}</p>
          <p><strong>Category:</strong> {thread.category}</p>
          <p><strong>Tags:</strong> {thread.tags.join(", ")}</p>
          <p><strong>Created By:</strong> {thread.createdBy}</p>
          <p><strong>Created At:</strong> {new Date(thread.createdAt).toLocaleString()}</p>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </div>
      ) : (
        <div className="thread-edit-card">
          <h3>Edit Thread</h3>
          <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Title" />
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" />
          <input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Category" />
          <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="Tags (comma separated)" />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        <input placeholder="Your Name" value={commentAuthor} onChange={e => setCommentAuthor(e.target.value)} />
        <textarea placeholder="Add a comment" value={commentText} onChange={e => setCommentText(e.target.value)} />
        <button onClick={handleAddComment}>Add Comment</button>

        {comments.map((c) => (
          <div key={c._id} className="comment-card">
  <div className="comment-header">
    <span className="author">{c.author}</span>
    <span className="dot">•</span>
    <span>{new Date(c.createdAt).toLocaleString()}</span>
  </div>
  <p>{c.text}</p>
</div>
        ))}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
