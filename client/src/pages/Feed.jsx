import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { posts } from "../services/api";

function Feed({ user }) {
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await posts.getAll();
      setAllPosts(res.data.posts);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await posts.create({ content: newPost });
      setNewPost("");
      loadPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    }
  };

  const handleLike = async (postId) => {
    try {
      await posts.like(postId);
      loadPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const toggleComments = async (postId) => {
    if (showComments[postId]) {
      setShowComments({ ...showComments, [postId]: false });
    } else {
      await loadComments(postId);
    }
  };

  const loadComments = async (postId) => {
    try {
      const res = await posts.getComments(postId);
      setComments({ ...comments, [postId]: res.data.comments });
      setShowComments({ ...showComments, [postId]: true });
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]?.trim()) return;

    try {
      await posts.addComment(postId, { content: newComment[postId] });
      setNewComment({ ...newComment, [postId]: "" });
      loadComments(postId);
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-8 text-center">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4 pb-8">
      {/* Create Post */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white rounded-lg shadow-md p-4 mb-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {newPost.length}/500
              </span>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="space-y-4">
        {allPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            No posts yet. Be the first to post something!
          </div>
        ) : (
          allPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              {/* Post Header */}
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.user.name[0].toUpperCase()}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    {post.user.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{post.user.username} · {formatTime(post.createdAt)}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Post Actions */}
              <div className="flex items-center gap-6 text-gray-600 border-t border-gray-100 pt-3">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                    post.likes.includes(user._id) ? "text-red-500" : ""
                  }`}
                >
                  <Heart
                    size={20}
                    fill={
                      post.likes.includes(user._id) ? "currentColor" : "none"
                    }
                  />
                  <span className="font-medium">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="font-medium">
                    {comments[post._id]?.length || 0} Comments
                  </span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post._id] && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  {/* Existing Comments */}
                  <div className="space-y-3 mb-4">
                    {comments[post._id]?.length > 0 ? (
                      comments[post._id].map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {comment.user.name[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-gray-900">
                                {comment.user.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatTime(comment.createdAt)}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm ml-10">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-2">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Write a comment..."
                      value={newComment[post._id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [post._id]: e.target.value,
                        })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post._id);
                        }
                      }}
                      maxLength={300}
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      disabled={!newComment[post._id]?.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
