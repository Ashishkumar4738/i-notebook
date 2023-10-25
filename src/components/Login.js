import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
const url = "http://localhost:5000";
function Login() {
    let navigate = useNavigate();

  const [credientail, setCredientail] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async(e)=> {
    e.preventDefault();
    const email = credientail.email;
    const password = credientail.password;
   


        const ur = `${url}/api/auth/login`;
        const LoginDetail = await axios.post(ur, {
          email,
          password,
        });
        
        
        if(LoginDetail.data.success){
          localStorage.setItem("token",LoginDetail.data.auth_token);
          navigate("/");
        }else{
            alert("unauthorized ")
        }
    
  }
  function handleChange(e) {
    setCredientail({ ...credientail, [e.target.name]: e.target.value });
  }
  return (
    <>
      <h1>this is login page</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={credientail.email}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              value={credientail.password}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
