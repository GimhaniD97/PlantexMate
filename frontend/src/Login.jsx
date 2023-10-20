import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!values.email) {
      newErrors.email = 'Email is required';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          if (values.email === 'admin@gmail.com') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        setErrors({ email: 'Invalid username or password' });
        console.log(err);
      });
    console.log('Form values:', values);
  };

  return (
    <div className="centered-container">
      <div className="container">
        <h1 className="text-center">PlantexMate</h1>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="form-group form-check"></div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
