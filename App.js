import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./UploadFile";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Footer from "./Footer";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/Header" element={<Header/>}/>
        <Route path="/Footer" element={<Footer/>}/>
      </Routes>
    </Router>
  );
};

export default App;
