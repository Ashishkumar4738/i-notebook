import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import axios from "axios";
function Axios(){
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;

    const getdata = async()=>{
        const url = "http://localhost:5000/api/list/fetchList";
        const {data} = await axios(url,{
            headers:{
                auth_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYWVlNzVlYWI5ZWZjYjEyOGNmNDZkIn0sImlhdCI6MTY5NzU2MDY4MH0.aQPeiBhXE6Vd02UC3_NBHdPZtu8UliTBpBpiyW1OHC4",
            },
        });
        // console.log(data[0].list);
        setNotes(data[0].list);
        // console.log(notes);

    }
    return (
        <>
            <button onClick={getdata} >Click to fetch data</button>
        </>
    )

}
export default Axios;