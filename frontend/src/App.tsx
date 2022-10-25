import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { HomeScreen } from "./page";

const App = () => {
  return (
    <Router>
      <Navbar/>
       <Routes>
         <Route path='/' element={<HomeScreen/>}/>
       </Routes>
    </Router>
  )
};

export default App;
