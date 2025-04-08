import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Home, Trophy, Users, User, Image,Menu, Send, Heart, MessageCircle, X , Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import UserDiscovery from './UserDiscovery';
// import { div } from '@tensorflow/tfjs';
import ProfileImage from '../Common/ProfileImage';



const SocialFeed = () => {
  const { user } = useContext(UserDataContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' or 'discover'
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/social/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() && !selectedImage) {
      toast.error('Please add some content to your post');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('content', newPost);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/social/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setNewPost('');
      setSelectedImage(null);
      fetchPosts();
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/social/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete post');
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/social/posts/${post._id}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Post deleted successfully!');
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete post';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-700">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Trophy className="w-6 h-6" />{" "}
          <span className="text-xl">FitSocial</span>
        </div>
        <div className="hidden md:flex gap-4 lg:gap-8 text-gray-700 text-base">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem
            to="/challenges"
            icon={<Trophy size={18} />}
            text="Challenges"
            active={true}
          />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md w-full py-4">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem to="/challenges" icon={<Trophy size={18} />} text="Challenges" active={true} />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              activeTab === 'feed'
                ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              activeTab === 'discover'
                ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Discover People
          </button>
        </div>

        {activeTab === 'feed' ? (
          <>
            {/* Create Post Section */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your fitness journey..."
                    className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2">
                    <label className="cursor-pointer flex items-center bg-blue-100 text-blue-950 gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto justify-center">
                      <Image size={20} />
                      <span>Add Photo</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                      />
                    </label>
                    <button
                      onClick={handleCreatePost}
                      disabled={loading}
                      className="bg-blue-100 text-blue-950 px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <Send size={20} />
                      {loading ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  currentUser={user}
                  onRefresh={fetchPosts}
                />
              ))}
            </div>
          </>
        ) : (
          <UserDiscovery />
        )}
      </div>
    </div>
  );
};

const PostCard = ({ post, onLike, currentUser, onRefresh }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);

  useEffect(() => {
    setComments(post.comments || []);
    setCommentCount(post.comments?.length || 0);
  }, [post.comments]);

  const handleComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/social/posts/${post._id}/comment`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.post.comments) {
        setComments(response.data.post.comments);
        setCommentCount(response.data.post.comments.length);
      }
      setNewComment('');
      toast.success('Comment added successfully!');
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete comment');
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/social/posts/${post._id}/comment/${commentId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update local comments state
        setComments(comments.filter(comment => comment._id !== commentId));
        setCommentCount(commentCount - 1);
        
        // Update the post's comment count in the parent component
        if (onRefresh) {
          onRefresh();
        }
        
        toast.success('Comment deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete comment';
      toast.error(errorMessage);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete post');
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/social/posts/${post._id}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Post deleted successfully!');
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete post';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 sm:p-6">
      {/* User Info with Delete Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ProfileImage 
            user={post.user} 
            size="md"
          />
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base">{post.user.name}</h3>
            <p className="text-xs text-white/70">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {post.user._id === currentUser._id && (
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:text-red-600 transition p-1 rounded-full hover:bg-red-100/10"
            title="Delete post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Post Content */}
      <p className="mb-4 text-white text-sm sm:text-base">{post.content}</p>

      {/* Post Image */}
      {post.image && (
        <div className="mb-4 relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt="Post"
            className="absolute inset-0 w-full h-full object-contain bg-black/40"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-2 text-white hover:text-blue-400 transition ${
            post.likes.includes(currentUser._id) ? 'text-blue-400' : ''
          }`}
        >
          <Heart 
            size={20} 
            className={`cursor-pointer ${post.likes.includes(currentUser._id) ? 'text-red-500' : 'text-white'}`} 
          />
          <span className='text-white text-sm sm:text-base'>{post.likes.length}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-white"
        >
          <MessageCircle size={20} />
          <span className="text-sm sm:text-base">{commentCount}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              onClick={handleComment}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-3 mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg">
                <ProfileImage 
                  user={comment.user}
                  size="sm"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white text-sm sm:text-base">{comment.user?.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-white/70">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                      {comment.user._id === currentUser._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-600 transition p-1 rounded-full hover:bg-red-100/10"
                          title="Delete comment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-white mt-1 text-sm sm:text-base">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-white/70 text-sm sm:text-base">No comments yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function NavItem({ icon, text, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 
        ${active 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {icon}
      <span className="text-sm sm:text-base">{text}</span>
    </Link>
  );
}

export default SocialFeed; 