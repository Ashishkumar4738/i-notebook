import { React, useContext, useEffect } from "react";
import Notesitem from "./Notesitem";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const context = useContext(NoteContext);
  // console.log(context);
  const { notes, getNotes } = context;
  const naviagte = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      props.handleAlert("You are not logged in","warning")
      naviagte("/login");
    }
  }, []);

  return (
    <>
    <div className="m-auto" style={{width:"5%"}} >
      <Addnote handleAlert={props.handleAlert} />
      </div>
      <Notesitem notes={notes} handleAlert={props.handleAlert} />
    </>
  );
}

export default Home;
