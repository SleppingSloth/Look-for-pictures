import React, { useState , useCallback} from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Header from "../Header";
import SingIn from "../Sing/SingIn";
import SingUp from "../Sing/SingUp";
import ErrorPage from "../ErrorPage/ErrorPage";
import ImgList from "../ImgList";
import HeroPage from "../HeroPage/HeroPage";
import ChangeHeroPage from "../ChangeHeroPage/ChangeHeroPage";

const App = () => {
  const [user, setUser] = useState({ role: "", token: "" });
  const [newHero, setNewHero] = useState([]);

  const listHero = useCallback(async () => {
    await fetch("http://localhost:5000/hero", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setNewHero(data));
  });

  return (
    <div className="container">
      <Router>
        <Header
          setUser={setUser}
          admin={user.role}
          token={user.token}
          listHero={listHero}
        />
        <Routes>
          <Route
            path="/"
            element={
              user.role === "ADMIN" || user.role === "USER" ? (
                <ImgList
                  admin={user.role}
                  token={user.token}
                  listHero={listHero}
                  newHero={newHero}
                />
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/singIn" element={<SingIn setUser={setUser} />} />
          <Route path="/singUp" element={<SingUp setUser={setUser} />} />
          <Route
            path="/heroPage/:comicId"
            element={user.role ? <HeroPage token={user.token} /> : null}
          />
          <Route
            path="/changeHeroPage/:comicId"
            element={
              user.role === "ADMIN" ? (
                <ChangeHeroPage token={user.token} />
              ) : null
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        flexWrap: "wrap",
      }}
    >
      <div className="h2">
        In order to view the pictures you need to log in to your profile
      </div>
      <div>
        <Link to="/singIn" className="link">
          Sing In
        </Link>
        <Link to="/singUp" className="link">
          Sing Up
        </Link>
      </div>
    </div>
  );
};

export default App;
