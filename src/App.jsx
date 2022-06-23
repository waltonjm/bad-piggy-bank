import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserProvider";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { CreateAccount } from "./components/CreateAccount";
import { Deposit } from "./components/Deposit";
import { Withdraw } from "./components/Withdraw";
import { AllData } from "./components/AllData";
import { NoRoute } from "./components/NoRoute";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

export const App = () => (
  <BrowserRouter>
    <UserProvider>
      <div className="h-100 d-flex flex-column">
        <NavBar />
        <div
          className="flex-grow-1 container mx-auto"
          style={{ padding: "20px" }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/create-account"
              element={
                <PublicRoute>
                  <CreateAccount />
                </PublicRoute>
              }
            />
            <Route
              exact
              path="/deposit"
              element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/withdraw"
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/all-data"
              element={
                <ProtectedRoute>
                  <AllData />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NoRoute />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  </BrowserRouter>
);
