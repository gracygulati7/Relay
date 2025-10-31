import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads, getComments } from "../services/api";
import "./HomePage.css";

function HomePage() {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeSort, setActiveSort] = useState("Hot");
  const [votes, setVotes] = useState({});

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

  const handleVote = (id, type) => {
    setVotes((prev) => {
      const current = prev[id] || 0;
      if (type === "up") return { ...prev, [id]: current === 1 ? 0 : 1 };
      if (type === "down") return { ...prev, [id]: current === -1 ? 0 : -1 };
      return prev;
    });
  };

  const sortThreads = (type, list) => {
    switch (type) {
      case "New":
        return [...list].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Top":
        return [...list].sort((a, b) => b.commentsCount - a.commentsCount);
      case "Rising":
        return [...list].sort(() => Math.random() - 0.5);
      default:
        return [...list].sort((a, b) => (votes[b._id] || 0) - (votes[a._id] || 0));
    }
  };

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

    filtered = sortThreads(activeSort, filtered);
    setFilteredThreads(filtered);
  }, [searchTerm, categoryFilter, threads, votes, activeSort]);

  return (
    <div className="home-container">
      <h1 className="page-title">All Threads</h1>

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

      <div className="sort-tabs">
        {["Hot", "New", "Top", "Rising"].map((tab) => (
          <button
            key={tab}
            className={activeSort === tab ? "active" : ""}
            onClick={() => setActiveSort(tab)}
          >
            {tab === "Hot" && "🔥"} {tab === "New" && "🆕"}{" "}
            {tab === "Top" && "⬆️"} {tab === "Rising" && "🚀"} {tab}
          </button>
        ))}
      </div>

      <div
        className="thread-list"
        style={{ minHeight: filteredThreads.length === 0 ? "auto" : "100%" }}
      >
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <div key={thread._id} className="thread-card">
              <div className="vote-section">
                <button
                  className={`vote-btn ${
                    votes[thread._id] === 1 ? "voted-up" : ""
                  }`}
                  onClick={() => handleVote(thread._id, "up")}
                >
                  ▲
                </button>
                <span className="vote-count">{votes[thread._id] || 0}</span>
                <button
                  className={`vote-btn ${
                    votes[thread._id] === -1 ? "voted-down" : ""
                  }`}
                  onClick={() => handleVote(thread._id, "down")}
                >
                  ▼
                </button>
              </div>

              <div className="thread-content">
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
                  <span className="comment-badge">
                    💬 {thread.commentsCount} Comments
                  </span>
                  <span className="thread-date">
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </span>
                </div>
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
