import { React, useContext, useEffect } from "react";
import Notesitem from "./Notesitem";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
function Home() {
  const context = useContext(NoteContext);
  // console.log(context);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  },[]);

  return (
    <>
      <Addnote />
      <Notesitem notes={notes} />
    </>
  );
}

export default Home;
