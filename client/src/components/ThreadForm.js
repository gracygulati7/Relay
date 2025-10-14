import React, { useState } from "react";
import "./ThreadForm.css";

function ThreadForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [createdBy, setCreatedBy] = useState(initialData?.createdBy || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdBy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="thread-form-table">
      <table>
        <tbody>
          <tr>
            <td><label>Thread Title:</label></td>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Description:</label></td>
            <td>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Category:</label></td>
            <td>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Tags (comma separated):</label></td>
            <td>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td><label>Your Name:</label></td>
            <td>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <button type="submit">Create Thread</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default ThreadForm;
