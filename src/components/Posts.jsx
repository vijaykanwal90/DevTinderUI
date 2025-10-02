import React from 'react'
import PostCard from './PostCard'
import { useState } from 'react';
const Posts = () => {
    const [posts, setPosts] = useState([
    {
      id: 1,
      username: "john_doe",
      userAvatar: "https://i.pravatar.cc/100?img=3",
      timestamp: "2 hours ago",
      postImage: "https://picsum.photos/600/600?random=1",
      caption: "Beautiful day in the mountains 🌄",
      content:"Beautiful day in the mountains",
      likes: 123,
      isLiked: false,
      isSaved: false,
      isPending: false,
      comments: [
        { id: 1, username: "jane_smith", text: "Wow, amazing view!" },
        { id: 2, username: "alex99", text: "I want to go there 😍" },
        { id: 3, username: "emma", text: "Breathtaking!" },
      ],
    },
    {
      id: 2,
      username: "travel_guru",
      userAvatar: "https://i.pravatar.cc/100?img=7",
      timestamp: "1 day ago",
      postImage: "https://picsum.photos/600/600?random=2",
      caption: "Exploring the streets of Italy 🇮🇹",
      likes: 89,
      isLiked: true,
      content:"Exploring the streets of Italy",
      isSaved: true,
      isPending: true, // shows accept/reject buttons
      comments: [
        { id: 1, username: "wanderer", text: "Italy is on my bucket list!" },
      ],
    },
  ]);

  // Handlers
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const handleComment = (id, text) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [...p.comments, { id: Date.now(), username: "you", text }],
            }
          : p
      )
    );
  };

  const handleSave = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };

  const handleAcceptRequest = (id) => {
    alert(`Friend request from post ${id} accepted`);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isPending: false } : p
      )
    );
  };

  const handleRejectRequest = (id) => {
    alert(`Friend request from post ${id} rejected`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <div>
       {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onSave={handleSave}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      ))}
    </div>
  )
}

export default Posts