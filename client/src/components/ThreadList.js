// import React, { useEffect, useState } from "react";
// import { getAllThreads } from "../services/api";
// import ThreadCard from "./ThreadCard";
// import "./ThreadList.css";

// function ThreadList() {
//   const [threads, setThreads] = useState([]);

//   useEffect(() => {
//     fetchThreads();
//   }, []);

//   const fetchThreads = async () => {
//     try {
//       const res = await getAllThreads();
//       setThreads(res.data);
//     } catch (err) {
//       console.error("Error fetching threads:", err);
//     }
//   };

//   return (
//     <div className="thread-list-container">
//     {threads.length === 0 ? (
//       <p>No threads available.</p>
//     ) : (
//       threads.map((thread) => <ThreadCard key={thread._id} thread={thread} />)
//     )}
//   </div>
//   );
// }

// export default ThreadList;
