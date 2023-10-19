import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registration() {

   const [values, setValues] = useState({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
   });

   const navigate = useNavigate();
   axios.defaults.withCredentials = true;
   const [error, setError] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/login', values)
         .then(res => {
            if (res.data.Status === 'Success') {
               navigate('/')
            } else {
               setError(res.data.Error);
            }
         })
         .catch(err => console.log(err));
      console.log('Form values:', values);
   }

   return (
      <div className="centered-container">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputUsername"
                           placeholder="Enter username"
                           onChange={e => setValues({ ...values, username: e.target.value })}
                        />
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                           type="email"
                           className="form-control"
                           id="inputEmail"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputPhone">Phone</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputPhone"
                           placeholder="Enter phone"
                           onChange={e => setValues({ ...values, phone: e.target.value })}
                        />
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input
                           type="password"
                           className="form-control"
                           id="inputPassword"
                           placeholder="Password"
                           onChange={e => setValues({ ...values, password: e.target.value })}
                        />
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input
                           type="password"
                           className="form-control"
                           id="inputConfirmPassword"
                           placeholder="Confirm Password"
                           onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                        />
                     </div>
                     <br />
                     <div className="form-group form-check">
                     </div>
                     <button type="submit" className="btn btn-primary">Register</button>
                  </form>
                  <p>Already have an account? <a href="/login">Login</a></p>

               </div>
            </div>
         </div>
      </div>
   );
}

export default Registration;
