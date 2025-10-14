import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createThread } from "../services/api";
import "./CreateThreadPage.css";

function CreateThreadPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    createdBy: "",
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.createdBy) {
      alert("Title, Description, and Name are required");
      return;
    }
    await createThread({
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()),
    });
    navigate("/");
  };

  return (
    <div className="create-thread-container">
      <h2>Create New Thread</h2>
      <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
      <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
      <input placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
      <input placeholder="Your Name" value={formData.createdBy} onChange={e => setFormData({...formData, createdBy: e.target.value})} />
      <button onClick={handleSubmit}>Create Thread</button>
    </div>
  );
}

export default CreateThreadPage;
