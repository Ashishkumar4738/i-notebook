import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = () => {
  const context = useContext(NoteContext);
  const [image, setImage] = useState(null);
  const { addNote, mode } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // const refClose = useRef(null);
  function handleClick(e) {
    e.preventDefault();
    // console.log(image);
    addNote(note.title, note.description, note.tag, image);
    setNote({ title: "", description: "", tag: ""});
    // refClose.current.click();
  }

  function handleChange(e) {
    // console.log(e.target.files[0])
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="modal-body">
        <div
          className={`container p-3`}
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
    </>
  );
};

export default Addnote;
