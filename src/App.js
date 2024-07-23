import React,{useState} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import "./App.css";
import Alert from "./components/Alert";
function App() {
  const [alert,setAlert] = useState(null);

  const handleAlert = (message,type)=>{
    setAlert(()=>{
      return{
        message,
        type
      };
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }


  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home handleAlert={handleAlert} />} />
              <Route path="/home" element={<Home handleAlert={handleAlert} />} />
              <Route path="/login" element={<Login handleAlert={handleAlert} />} />
              <Route path="/signup" element={<Signup handleAlert={handleAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </NoteState>
    </>
  );
}

export default App;
