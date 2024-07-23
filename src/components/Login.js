import React, { useState, useRef, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const url = "http://localhost:5000";
let backendOtp;

function Login(props) {
  const context = useContext(NoteContext);
  const { mode } = context;
  let navigate = useNavigate();

  const [credientail, setCredientail] = useState({
    email: "",
    password: "",
    resetPasswordForm: "",
    otp: "",
 
  });

  const refClick = useRef(null);
  const refClose = useRef(null);
  const refReset = useRef(null);
  const refGetOtp = useRef(null);
  const resetPassword = async () => {
    refClick.current.click();
    props.handleAlert("You are going to reset your password", "warning");
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    refClose.current.click();
    const email = credientail.email;
    try {
      const ur = `${url}/api/auth/otp`;
      const changes = await axios.post(ur, {
        email,
      });
      if (changes.data.success) {

        props.handleAlert("Otp sent successfully", "success");
        backendOtp = changes.data.otp;
        refGetOtp.current.click();
      }else{
        props.handleAlert("Email not exist", "danger");
      }
    } catch (error) {}
  };

  const checkOtp = (e)=>{
    e.preventDefault();
    if (backendOtp === credientail.otp) {
      props.handleAlert("Otp matched", "success");
      refReset.current.click();
    }else{
      props.handleAlert("otp not matched try again", "danger");
    }

  }

  const handleReset = async (e) => {
    e.preventDefault();
    refClose.current.click();
    const email = credientail.email;
    const password = credientail.resetPasswordForm;
    if (!email) {
      props.handleAlert("Please First fill email", "danger");
    } else if (!password) {
      props.handleAlert("password must be 6 digit long", "warning");
    } else {
      const ur = `${url}/api/auth/reset`;
      const changes = await axios.post(ur, {
        email,
        password,
      });
      if (changes.data.success) {
        props.handleAlert("Password change successfully", "success");
        navigate("/login");
      } else {
        props.handleAlert("Email not exist you need to signup first", "danger");
        navigate("/signup");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = credientail.email;
    const password = credientail.password;
    const ur = `${url}/api/auth/login`;
    const LoginDetail = await axios.post(ur, {
      email,
      password,
    });

    // console.log("login ",LoginDetail.data.jwtToken)
    if (LoginDetail.data.success) {
      localStorage.setItem("token", LoginDetail.data.jwtToken);
      navigate("/");
      props.handleAlert("Login Successful", "success");
    } else {
      // alert("unauthorized ")
      props.handleAlert("Please try again with right credientails", "danger");
    }
  };
  function handleChange(e) {
    setCredientail({ ...credientail, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h2>Login to your account</h2>

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refClick}
        hidden
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
              color: mode === "light" ? "black" : "white",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Reset Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={ sendOtp}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    onChange={handleChange}
                    value={credientail.email}
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Check otp
                </button>
              </form>
              ...
            </div>
            <div className="modal-footer" hidden>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ******************************************************************************************************************? */}

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#checkotp"
        ref={refGetOtp}
        hidden
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="checkotp"
        tabIndex="-1"
        aria-labelledby="checkotpLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
              color: mode === "light" ? "black" : "white",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="checkotpLabel">
                Reset Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={ checkOtp}>
                
                <div className={`mb-3 ` }   >
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Otp
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="otp"
                    value={credientail.otp}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Otp
                </button>
              </form>
              ...
            </div>
            <div className="modal-footer" hidden>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* *********************************************************************************************************************************** */}
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#setResetPassword"
        ref={refReset}
        hidden
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="setResetPassword"
        tabIndex="-1"
        aria-labelledby="setResetPasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
              color: mode === "light" ? "black" : "white",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Reset Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleReset}>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>

                  <input
                    onChange={handleChange}
                    value={credientail.resetPasswordForm}
                    type="password"
                    name="resetPasswordForm"
                    className="form-control"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </form>
              ...
            </div>
            <div className="modal-footer" hidden>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ********************************************************************************************************************************** */}
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
          <p
            className="d-flex flex-end justify-content-end form-check-labe"
            onClick={resetPassword}
            style={{ cursor: "pointer" }}
          >
            Forget Password?
          </p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
