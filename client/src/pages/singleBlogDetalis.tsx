// Updated SingleBlogDetails.tsx with backend interaction for likes, comments, and share count
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/singleBlogDetails.css';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  featuredImage?: string;
  author: {
    _id: string;
    fullName: string;
  };
  likes: number;
  shares: number;
  comments: Comment[];
}

interface Comment {
  authorName: string;
  text: string;
  createdAt?: string;
}

const SingleBlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [newComment, setNewComment] = useState<Comment>({ authorName: '', text: '' });
  const [liked, setLiked] = useState(false);
  const blogURL = `http://localhost:5173/blog-details/${id}`;

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);

        const blogResponse = await axios.get(`http://localhost:3000/getblogs/${id}`);
        const allBlogsResponse = await axios.get('http://localhost:3000/getblogs');

        setBlog(blogResponse.data);
        setAllBlogs(allBlogsResponse.data.filter((b: Blog) => b._id !== id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.authorName || !newComment.text || !id) return;
    try {
      const response = await axios.post(`http://localhost:3000/api/getblogs/comment/${id}`, newComment);
      setBlog(prev => prev ? { ...prev, comments: [response.data, ...prev.comments] } : prev);
      setNewComment({ authorName: '', text: '' });
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleLike = async () => {
    if (liked || !id) return;
    try {
      await axios.post(`http://localhost:3000/api/getblogs/like/${id}`);
      setLiked(true);
      setBlog(prev => prev ? { ...prev, likes: prev.likes + 1 } : prev);
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(`http://localhost:3000/api/getblogs/share/${id}`);
      if (navigator.share) {
        await navigator.share({
          title: blog?.title || 'Check out this blog',
          text: 'I found this blog interesting!',
          url: blogURL
        });
      } else {
        await navigator.clipboard.writeText(blogURL);
        alert('Link copied to clipboard!');
      }
      setBlog(prev => prev ? { ...prev, shares: prev.shares + 1 } : prev);
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  if (loading) return <div className="loading">Loading blog details...</div>;
  if (!blog) return <div className="not-found">Blog not found.</div>;

  return (
    <div className="main-details">
      <div className="left-details">
        <article className="blog-article">
          <h1 className="blog-title">{blog.title}</h1>

          {blog.featuredImage && (
            <img src={`http://localhost:3000/uploads/${blog.featuredImage}`} alt={blog.title} className="blog-featured-image" />
          )}

          <p className="blog-author">by <strong>{blog.author?.fullName}</strong></p>

          <div className="blog-content tags" dangerouslySetInnerHTML={{ __html: blog.tags }} />
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="like-share-section">
            <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
              ❤️ Like <span>({blog.likes})</span>
            </button>
            <button className="share-btn" onClick={handleShare}>
              🔗 Share <span>({blog.shares})</span>
            </button>
          </div>
        </article>

        <section className="comments-section">
          <h2>Comments ({blog.comments.length})</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Your name"
              value={newComment.authorName}
              onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              required
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>

          <div className="comments-list">
            {blog.comments.map((comment, i) => (
              <div key={i} className="comment-item">
                <p><strong>{comment.authorName}</strong> <span className="comment-date">{new Date(comment.createdAt || '').toLocaleString()}</span></p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="right-details">
        <h2 className="sidebar-title">Recommended Blogs</h2>
        <div className="recommended-blogs">
          {allBlogs.slice(0, 4).map((b) => (
            <Link to={`/blog-details/${b._id}`} key={b._id} className="recommended-blog-card">
              {b.featuredImage && (
                <img src={`http://localhost:3000/uploads/${b.featuredImage}`} alt={b.title} className="recommended-thumbnail" />
              )}
              <div className="recommended-blog-content">
                <h3 className="recommended-blog-title">{b.title}</h3>
                <p className="recommended-blog-excerpt">{b.excerpt || 'Click to read more...'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
