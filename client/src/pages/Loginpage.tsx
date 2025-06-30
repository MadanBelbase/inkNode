import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Save token and user data
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Login successful!");
        navigate("/"); // Protected route
      } else {
        if (result.errors) {
          const errObj: { [key: string]: string } = {};
          result.errors.forEach((err: { param: string; msg: string }) => {
            errObj[err.param] = err.msg;
          });
          setErrors(errObj);
        } else if (result.message) {
          alert(`Login failed: ${result.message}`);
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrors({ general: "Server error. Please try again." });
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
            required
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={data.password}
            onChange={handleChange}
            required
            aria-invalid={!!errors.password}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {errors.general && <div className="error">{errors.general}</div>}

        <button type="submit" className="submit-btn">Login</button>
      </form>

      <p className="signup-link">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
