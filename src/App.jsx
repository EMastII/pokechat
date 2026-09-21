import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const { user, login, logout, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={<SignUpPage onSignUpSuccess={login} />}
        />
        <Route
          path="/signin"
          element={<SignInPage onSignInSuccess={login} />}
        />

        {/* Protected Routes - Only accessible when logged in */}
        {user ? (
          <Route
            path="/dashboard/*"
            element={<Dashboard user={user} onLogout={logout} />}
          />
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
        )}

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
