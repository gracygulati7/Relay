import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../services/api";
import "./HomePage.css";

function HomePage() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await getAllThreads();
        setThreads(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchThreads();
  }, []);

  return (
    <div className="home-container">
      <h1>All Threads</h1>
      {threads.map((thread) => (
        <div key={thread._id} className="thread-card">
          <Link to={`/thread/${thread._id}`}>
            <h3>{thread.title}</h3>
          </Link>
          <p>{thread.description}</p>
          <p>
            <strong>Category:</strong> {thread.category} | <strong>By:</strong> {thread.createdBy}
          </p>
          <p><strong>Tags:</strong> {thread.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
