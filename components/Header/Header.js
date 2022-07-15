import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ModalAddNewHero from "../ModalAddNewHero/ModalAddNewHero";

const Header = ({ setUser, admin, token }) => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ paddingLeft: "20px", margin: "10px" }}
    >
      <NavLink to="/" className="navbar-brand">
        Home
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <NavLink
              to="/singIn"
              className={({ isActive }) =>
                isActive ? "active nav-item nav-link" : "nav-item nav-link "
              }
            >
              Sing in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/singUp"
              className={({ isActive }) =>
                isActive ? "active nav-item nav-link" : "nav-item nav-link "
              }
            >
              Sing up
            </NavLink>
          </li>
          <li className="nav-item">
            <a
              
              className="nav-link"
              onClick={() => {
                setUser({ roles: "", token: "" });
                navigate("/")
              }}
            >
              Sing out
            </a>
          </li>
        </ul>
      </div>

      {admin === "ADMIN" ? <ModalAddNewHero token ={token}/> : null}
    </nav>
  );
};

export default Header;
