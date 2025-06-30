import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✍️</span>
          <span className="logo-text">InkNode</span>
        </Link>

        <div className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`user-section ${isMobileMenuOpen ? 'active' : ''}`}>
          {token && userData && (
            <span className="navbar-user">
              Welcome, {userData.username || userData.fullName}
            </span>
          )}

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link">Blogs</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li> */}

            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/create-blog" className="nav-link">Create Post</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link auth-button login-button">Login</Link>
                <Link to="/signup" className="nav-link auth-button signup-button">Sign Up</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;