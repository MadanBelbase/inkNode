import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css'; 
import { Link } from 'react-router-dom'; 

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getblogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched blogs:', data);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div className="home-container">
      <section className="feature-showcase">
        {loading ? (
          <p>Loading latest blogs...</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                {blog.featuredImage ? (
                  <img
                  src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                  alt={blog.title}
                  className="blog-image"
                />
                ) : (
                  <div className="no-image-placeholder">No image available</div>
                )}
                <Link to={`/blog-details/${blog._id}`} className="read-more">Read More →</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    

    
    </div>
  );
};

export default HomePage;
