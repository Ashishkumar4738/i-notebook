import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function Footer() {
  const context = useContext(NoteContext);
  const { mode } = context;
  return (
    <>
      <div className="container">
        <footer
          className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
          style={{
            backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
            color: mode === "light" ? "black" : "white",
          }}
        >
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            ></a>

            <span className="mb-3 mb-md-0 ">© 2023 Company, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-body-secondary"
                target="_blank"
                href="https://github.com/Ashishkumar4738"
              >
                {" "}
                <img src="./assests/images/github.svg" alt="images" />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-body-secondary"
                target="_blank"
                href="https://instagram.com/me_ashishkumar_._?igshid=OGQ5ZDc2ODk2ZA=="
              >
                {" "}
                <img src="./assests/images/instagram.svg" alt="images" />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-body-secondary"
                target="_blank"
                href="https://www.linkedin.com/in/ashish-kumar4738/"
              >
                {" "}
                <img src="./assests/images/linkedin.svg" alt="images" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
export default Footer;
