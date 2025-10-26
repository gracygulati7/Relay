import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads, getComments } from "../services/api";
import "./HomePage.css";

function HomePage() {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch all threads and attach comment counts
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await getAllThreads();
        const threadsWithCounts = await Promise.all(
          res.data.map(async (thread) => {
            const commentsRes = await getComments(thread._id);
            return { ...thread, commentsCount: commentsRes.data.length };
          })
        );
        setThreads(threadsWithCounts);
        setFilteredThreads(threadsWithCounts);
      } catch (err) {
        console.error("Error fetching threads:", err);
      }
    };
    fetchThreads();
  }, []);

  // Filter + search logic
  useEffect(() => {
    let filtered = threads;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    setFilteredThreads(filtered);
  }, [searchTerm, categoryFilter, threads]);

  return (
    <div className="home-container">
      <h1 className="page-title">All Threads</h1>

      {/* Search & Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Programming">Programming</option>
          <option value="Web Development">Web Development</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Thread List */}
      <div className="thread-list" style={{ minHeight: filteredThreads.length === 0 ? "auto" : "100%" }}>
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <div key={thread._id} className="thread-card">
              <div className="thread-header">
                <img
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${thread.createdBy}`}
                  alt="avatar"
                  className="thread-avatar"
                />
                <div>
                  <h3 className="thread-title">
                    <Link to={`/thread/${thread._id}`}>{thread.title}</Link>
                  </h3>
                  <p className="thread-meta">
                    {thread.category} • By <b>{thread.createdBy}</b>
                  </p>
                </div>
              </div>

              <p className="thread-description">{thread.description}</p>

              <div className="thread-footer">
                <span className="comment-badge">💬 {thread.commentsCount}</span>
                <span className="thread-date">
                  {new Date(thread.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-threads">No threads found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
