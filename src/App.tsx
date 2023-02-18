import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import MyCards from "./components/MyCards";
import SignUp from "./components/SignUp";
import AddCard from "./components/AddCard";
import AllCards from "./components/AllCards";
import { ToastContainer } from "react-toastify";
import About from "./components/About";
import Footer from "./components/Footer";

export let UserData = createContext<any>({});

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
    JSON.parse(sessionStorage.getItem("userData") as string) == null
      ? false
      : JSON.parse(sessionStorage.getItem("userData") as string).isLoggedIn
  );
  let [userId, setUserId] = useState<number>(
    JSON.parse(sessionStorage.getItem("userData") as string) == null
      ? 0
      : JSON.parse(sessionStorage.getItem("userData") as string).userId
  );
  return (
    <>
      <Router>
        <UserData.Provider
          value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
        >
          <ToastContainer />
          <div className="body">
            <Navbar />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/mycards" element={<MyCards />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/addcard" element={<AddCard />} />
              <Route path="/allcards" element={<AllCards />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </UserData.Provider>
      </Router>
      <Router></Router>
    </>
  );
}

export default App;
