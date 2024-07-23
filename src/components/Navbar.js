import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(NoteContext);
  const { mode, handleMode, setNotes } = context;
  if (mode === "light") {
    document.getElementById("root").style.backgroundColor = "#f3f3f3";
    document.getElementById("root").style.color = "black";
  } else {
    document.getElementById("root").style.backgroundColor = "#4c0a53";
    document.getElementById("root").style.color = "white";
  }
  function changeMode() {
    handleMode();
  }

  const logout = ()=>{
    localStorage.removeItem("token");
    setNotes([]);
    navigate("/login")
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg  bg-${mode} navbar-${mode}  `}
        
      >
        <div className="container-fluid "  >
          <Link
            to="/"
            className={`navbar-brand ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            i-Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" || location.pathname === "/home"
                      ? "active"
                      : ""
                  } `}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              
            
            </ul>
            <div className="form-check form-switch">
              <input
                onClick={changeMode}
                className="form-check-input mx-2"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDisabled"
              />
            </div>
          </div>
          { !localStorage.getItem("token")?(
          <form className="d-flex" role="search">
          <Link to="/login">
            <button type="button" className="btn btn-primary mx-1">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button type="button" className="btn btn-primary mx-1">
              Signup
            </button>
          </Link>
          </form>
          ):( <button onClick={logout} type="button"  className="btn btn-primary mx-1">
          Logout
        </button>) }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
