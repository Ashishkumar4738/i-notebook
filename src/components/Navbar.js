import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const context = useContext(NoteContext);
  const { mode, handleMode } = context;
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

  return (
    <>
      <nav className={`navbar navbar-expand-lg  bg-${mode} navbar-${mode} `}>
        <div className="container-fluid  ">
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
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/notesitem" ? "active" : ""
                  } `}
                  to="/notesitem"
                >
                  NotesItem
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Disabled
                </Link>
              </li> */}
            </ul>
            <div className="form-check form-switch">
              <input
                onClick={changeMode}
                className="form-check-input mx-2"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDisabled"
              />
              {/* <label className="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label> */}
            </div>
          </div>

          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
