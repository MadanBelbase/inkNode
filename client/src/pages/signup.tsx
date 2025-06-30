import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import '../styles/signup.css';

const Signup: React.FC = () => {
    const navigate = useNavigate(); 
  const [data, setData] = React.useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  // To store backend validation errors
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (data.password !== data.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Signup successful! You're now logged in.");
        navigate('/');
      } else {
        if (result.errors) {
          // Map errors array from express-validator to error object
          const errObj: { [key: string]: string } = {};
          result.errors.forEach((error: { param: string; msg: string }) => {
            errObj[error.param] = error.msg;
          });
          setErrors(errObj);
        } else if (result.message) {
          alert(`Signup failed: ${result.message}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='signup'>
      <div className='signup-form'>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name:</label>
            <input type='text' id='fullName' name='fullName' value={data.fullName} onChange={handleChange} required />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' value={data.username} onChange={handleChange} minLength={4} required />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' value={data.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='phone'>Phone Number:</label>
            <input type='tel' id='phone' name='phone' value={data.phone} onChange={handleChange} required />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='location'>Location:</label>
            <input type='text' id='location' name='location' value={data.location} onChange={handleChange} />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' value={data.password} onChange={handleChange} minLength={8} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input type='password' id='confirmPassword' name='confirmPassword' value={data.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className='form-group terms'>
            <input type='checkbox' id='terms' name='terms' checked={data.terms} onChange={handleChange} required />
            <label htmlFor='terms'>I agree to the Terms of Service and Privacy Policy</label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type='submit' className='submit-btn'>Create Account</button>
        </form>

        <div className='login-link'>
          <p>Already have an account? <Link to='/login'>Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
