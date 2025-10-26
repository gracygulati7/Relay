// import React from "react";
// import { Link } from "react-router-dom";
// import "./ThreadCard.css";

// function ThreadCard({ thread }) {
//   return (
//     <div className="thread-card">
//   <div className="thread-card-votes">
//     <button>⬆</button>
//     <span>
//       {thread.votes?.filter(v => v.type === 'upvote').length -
//         thread.votes?.filter(v => v.type === 'downvote').length}
//     </span>
//     <button>⬇</button>
//   </div>

//   <div className="thread-card-content">
//     <div className="thread-card-header">
//       <h3>
//         <Link to={`/thread/${thread._id}`}>{thread.title}</Link>
//       </h3>
//       <span className="thread-category">{thread.category}</span>
//     </div>
//     <p>{thread.description}</p>
//     <div className="thread-footer">
//       <span>By: {thread.createdBy}</span>
//       <span>{new Date(thread.createdAt).toLocaleString()}</span>
//     </div>
//   </div>
// </div>
//   );
// }

// export default ThreadCard;
