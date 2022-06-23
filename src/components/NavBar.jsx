import React from "react";
import logo from "../assets/piggy-bank-light.png";
import { NavLink } from "./NavLink";
import { useUser } from "./UserProvider";

export const NavBar = () => {
  const { me, logout } = useUser();
  const isLoggedIn = me && me.email;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img height="50px" src={logo} alt="Logo" />
          <span className="ms-3">Piggy Bank</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav nav w-100">
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/create-account"
                  className="nav-link"
                  activeClassName="text-primary fw-bold"
                >
                  Create Account
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="text-primary fw-bold"
                    to="/deposit"
                  >
                    Deposit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="text-primary fw-bold"
                    to="/withdraw"
                  >
                    Withdraw
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="text-primary fw-bold"
                    to="/all-data"
                  >
                    All Data
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="nav navbar-nav navbar-right flex-shrink-0 gap-4 align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">{me.email}</li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="text-primary fw-bold"
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
