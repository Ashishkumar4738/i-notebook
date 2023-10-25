import { React, useState } from "react";
import NoteContext from "./NoteContext";

import axios from "axios";
const url = "http://localhost:5000";

const NoteState = (props) => {
  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);
  const [mode, setMode] = useState("light");

  
  //fetch notes from server
  const getNotes = async () => {
    const ur = `${url}/api/list/fetchList`;
    const { data } = await axios(ur, {
      headers: {
        auth_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYWVlNzVlYWI5ZWZjYjEyOGNmNDZkIn0sImlhdCI6MTY5NzkxNzM5N30.sX8Xu7M1klhTh3ljmNsNni3N9dJy0Uyck0K0w498Cs0",
      },
    });
    // console.log(data[0].list);
    setNotes(data[0].list);
    // console.log(notes);
  };

  //login
  

  //add notes into database from server
  const addNote = async (title, description, tag, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("image", image);
    const ur = `${url}/api/list/addList`;
    try {
      const { data } = await axios.post(
        ur,
        // {
        //   title,
        //   description,
        //   tag,
        // },
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            auth_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYWVlNzVlYWI5ZWZjYjEyOGNmNDZkIn0sImlhdCI6MTY5NzkxNzM5N30.sX8Xu7M1klhTh3ljmNsNni3N9dJy0Uyck0K0w498Cs0",
          },
        }
      );
      // console.log(data);
      setNotes(data[0].list);
    } catch (error) {
      console.log("some error in post");
    }
  };
  //delete notes from server
  const deleteNote = async (id) => {
    // console.log("Note with id have deleted ", id);
    const ur = `${url}/api/list/deleteList/${id}`;
    try {
      const { data } = await axios.delete(ur, {
        headers: {
          auth_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYWVlNzVlYWI5ZWZjYjEyOGNmNDZkIn0sImlhdCI6MTY5NzkxNzM5N30.sX8Xu7M1klhTh3ljmNsNni3N9dJy0Uyck0K0w498Cs0",
        },
      });
      console.log(data);
    } catch (error) {
      console.log("some error in post");
    }

    const newArr = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newArr);
  };
  //update notes on server
  const updateNote = async (id, title, description, tag) => {
    const ur = `${url}/api/list/updateList/${id}`;
    try {
      const { data } = await axios.put(
        ur,
        {
          title,
          description,
          tag,
        },

        {
          headers: {
            auth_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYWVlNzVlYWI5ZWZjYjEyOGNmNDZkIn0sImlhdCI6MTY5NzkxNzM5N30.sX8Xu7M1klhTh3ljmNsNni3N9dJy0Uyck0K0w498Cs0",
          },
        }
      );
      // console.log(data);
      setNotes(data[0].list);
    } catch (error) {
      console.log("some error in post");
    }
  };

  const handleMode = () => {
    setMode(() => {
      if (mode === "light") {
        return "dark";
      } else return "light";
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        mode,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        updateNote,
        handleMode,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
