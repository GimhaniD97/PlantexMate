import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {

   const [values,setValues]=useState({
      email:'',
      password:''
   });

   const navigate=useNavigate();
   axios.defaults.withCredentials = true;
   const [error,setError]=useState('');

   const handleSubmit=(event)=>{
      event.preventDefault();
      axios.post('http://localhost:8081/login',values)
      .then(res=>{
        if (res.data.Status==='Success') {
          navigate('/')
        }else{
          setError(res.data.Error);
        }
      })
      .catch(err=>console.log(err));
      console.log('Form values:', values);
   }


  return (
    <div className="centered-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                    onChange={e=>setValues({...values, email:e.target.value})}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                  onChange={e=>setValues({...values, password:e.target.value})}
                  />
                </div>
                <div className="form-group form-check">
                 
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login
