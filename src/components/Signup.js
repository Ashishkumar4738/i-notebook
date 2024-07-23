import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000";
function Signup(props) {
    let navigate = useNavigate();
    const [crediential, setCrediential] = useState({
        username:"",
        email:"",
        password:"",
        copy_password:""
    })
    const handleChange = (e)=>{
        setCrediential({...crediential,[e.target.name]:e.target.value});
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        const name = crediential.username;
        const email = crediential.email;
        const password = crediential.password;
        if(crediential.copy_password!==password){
            // alert("Not Match: Please check your password with re-enter password")
            props.handleAlert("Your passwords are not same","danger");
        }else{
            const ur = `${url}/api/auth/createUser`;
            const sign = await axios.post(ur,{
                name,email,password
            });

            if(!sign.data.success){

              navigate("/login");
              props.handleAlert("This email is already registered.","danger");
            }else{
              navigate("/");
              props.handleAlert("Your account created Successfully.","success");
            }
        }

    }
  return (
    <>
    <h2>Create your account...</h2>
      <form onSubmit={onSubmit} >
        <label htmlFor="username" className="form-label">
            Username
          </label>
        <div className="input-group mb-3">
          <input
            type="text"
            onChange={handleChange}
            name="username"
            className="form-control"
            placeholder="Enter name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={crediential.username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            onChange={handleChange}
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={crediential.email}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            minLength={6}
            onChange={handleChange}
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={crediential.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Re-enter Password
          </label>
          <input
          minLength={6}
          onChange={handleChange}
          name="copy_password"
            type="password"
            className="form-control"
          
            value={crediential.copy_password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default Signup;
