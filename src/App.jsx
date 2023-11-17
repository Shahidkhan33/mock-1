import { useState,useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Todolistmain from "./components/Todolistmain";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";

function App() {

  return (

    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/todolistmain/:userid" element={<Todolistmain/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
