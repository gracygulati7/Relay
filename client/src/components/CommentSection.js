import React, { useState, useEffect } from "react";
import { getComments, addComment } from "../services/api";
import { Send, MessageSquare } from "lucide-react";
import "./CommentSection.css";

function CommentSection({ threadId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await getComments(threadId);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment(threadId, { text, author: author || "Anonymous" });
      setText("");
      setAuthor("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <MessageSquare size={20} />
        <h3>Comments ({comments.length})</h3>
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-form-row">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="comment-author-input"
          />
          <div className="comment-input-wrapper">
            <input
              type="text"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="comment-text-input"
            />
            <button type="submit" className="send-btn">
              <Send size={16} />
            </button>
          </div>
        </div>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="no-comment-text">No comments yet. Start the conversation 💬</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="comment-card">
              <div className="comment-meta">
                <span className="comment-author">{c.author || "Anonymous"}</span>
                <span className="comment-date">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="comment-content">{c.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
