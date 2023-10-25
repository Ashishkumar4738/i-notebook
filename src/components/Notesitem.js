import React, { useState,useRef, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function Notesitem(props) {
  // console.log(props.notes[0]);
  const context = useContext(NoteContext);
  const { deleteNote, mode, updateNote } = context;
  function handleDelet(id) {
    deleteNote(id);
  }
  const refEdit = useRef(null);
  const refClose = useRef(null);
  const [Id, handleId] = useState("");
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  function setId(id) {
    handleId(id);
    refEdit.current.click();
  }
  function handleClick(e) {
    // console.log(Id);

    e.preventDefault();
    // console.log("inside the handleclick in notesitem");
    updateNote(Id, note.title, note.description, note.tag);
    refClose.current.click();
  }

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refEdit}
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
        <div className="modal-dialog"  >
          <div className="modal-content">
            <div className="modal-header" style={{
            backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
            color: mode === "light" ? "black" : "white",
          }} >
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{
            backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
            color: mode === "light" ? "black" : "white",
          }} >
              <form  >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="modal-footer">
                <button
                  onClick={handleClick}
                  type="submit"
                  className="btn btn-primary"  
                >
                  Submit
                </button>
                </div>
              </form>
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

      <div className="container">
        <div className="row mt-5 ">
          {props.notes.length===0?"No notes to display": props.notes.map((item) => {
            const { _id, title, description, tag, imageUrl } = item;
            return (
              <div
                key={_id}
                className="card col-sm-10 col-md-4 col-lg-3 mx-auto gap-3 "
                style={{
                  backgroundColor: mode === "light" ? "#f3f3f3" : "#961f83",
                  color: mode === "light" ? "black" : "white",
                  minWidth: "370px",
                  marginBottom: "20px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex flex-column">
                    <div className="mb-2" >
                    <img width={"100%"} height={"200rem"} border-radius={"20px"} src={`http://localhost:5000/${imageUrl}`} alt="nature" />
                    {/* {console.log(`http://localhost:5000/${imageUrl}`)} */}
                    </div>
                    <h5 className="card-title">{title}</h5>
                    <div className="d-flex justify-content-end">
                      <i
                        className="fa-solid fa-trash-can mx-3 "
                        onClick={() => {
                          handleDelet(_id);
                        }}
                        
                      ></i>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ border: "none", width: "0px", height: "0px" }}
                        onClick={() => {
                          setId(_id);
                        }}
                        
                      >
                        <i
                          className="fa-regular fa-pen-to-square"
                          
                        ></i>
                      </button>
                      <hr />
                    </div>
                  </div>
                  <p className="card-text">{description}</p>
                  <hr />
                  <h6>{tag}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notesitem;
