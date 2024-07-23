import React, { useState, useContext, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const [image, setImage] = useState(null);
  const { addNote, mode } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const refAdd = useRef(null);
  const refClose = useRef(null);
  // const refClose = useRef(null);
  function handleClick(e) {
    e.preventDefault();
    // console.log(image);
    addNote(note.title, note.description, note.tag, image);
    props.handleAlert("Note added successfully","success");
    setNote({ title: "", description: "", tag: ""});
    refClose.current.click();
  }
  function showModal(){
    refAdd.current.click();
  }

  function handleChange(e) {
    // console.log(e.target.files[0])
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
    {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addnotemodal" ref={refAdd} hidden>
  Add note
</button>
<button  onClick={showModal} type="button"  className="btn btn-primary mx-1">
          Addnote
        </button>

{/* <!-- Modal --> */}
<div className="modal fade" id="addnotemodal" tabIndex="-1" aria-labelledby="addnotemodalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content" style={{
            backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
            color: mode === "light" ? "black" : "white",
          }} >
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


      <div className="modal-body mt-2">
        <div
          className={`container`}
          style={{
            backgroundColor: mode === "light" ? "#f3f3f3" : "#4c0a53",
            color: mode === "light" ? "black" : "white",
          }}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                value={note.title}
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
                value={note.description}
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
                value={note.tag}
                type="text"
                name="tag"
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload image from here...
              </label>
              <input
                
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                name="image"
                className="form-control"
                type="file"
                id="formFile"
              />
            </div>
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-primary m-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>





      </div>
      <div className="modal-footer" hidden>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>















     
    </>
  );
};

export default Addnote;
