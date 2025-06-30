
// src/pages/HomePage.tsx
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Blogger",
      content: "InkNode has transformed my writing workflow. The intuitive interface makes publishing a breeze!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content: "As someone who needs to publish regularly, InkNode saves me hours every week. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Writer",
      content: "The best blogging platform I've used in 10 years of content creation. The features are perfectly tailored for writers.",
      rating: 4
    }
  ];

  const features = [
    {
      title: "AI-Powered Writing Assistant",
      description: "Get real-time suggestions to improve your writing clarity and SEO.",
      icon: "✍️"
    },
    {
      title: "Customizable Themes",
      description: "Choose from dozens of beautiful templates or create your own.",
      icon: "🎨"
    },
    {
      title: "Collaboration Tools",
      description: "Work with editors and co-writers in real-time with version control.",
      icon: "👥"
    },
    {
      title: "Analytics Dashboard",
      description: "Track your audience engagement and growth with detailed metrics.",
      icon: "📊"
    },
    {
      title: "Monetization Options",
      description: "Easily integrate ads, memberships, and affiliate marketing.",
      icon: "💰"
    },
    {
      title: "Cross-Platform Publishing",
      description: "Publish to your blog, social media, and email lists simultaneously.",
      icon: "🚀"
    }
  ];

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to InkNode</h1>
        <p>Craft your perfect blog with our powerful publishing platform</p>
        {/* <button className="cta-button">Start Your Free Trial</button> */}
      </header>

      <section className="feature-showcase">
        <h2>Popular Blog Posts</h2>
        {loading ? (
          <p>Loading latest blogs...</p>
        ) : (
          <div className="blog-grid">
            {blogs.slice(0, 3).map((blog) => (
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

      <section className="features">
        <h2>Powerful Features for Modern Bloggers</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Elevate Your Blogging Experience?</h2>
        <p>Join thousands of creators who publish with InkNode every day</p>
        {/* <div className="cta-buttons">
          <button className="cta-button primary">Start Free 14-Day Trial</button>
          <button className="cta-button secondary">Schedule a Demo</button>
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;
