import React, { useContext } from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard";

function Routes({ fetchAllPokemon, fetchPokemonByName, fetchFeaturedPokemon }) {
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
    <RouterRoutes>
      <Route
        path="/"
        element={<HomePage fetchFeaturedPokemon={fetchFeaturedPokemon} />}
      />
      <Route
        path="/signup"
        element={
          <SignUpPage
            onSignUpSuccess={login}
            fetchAllPokemon={fetchAllPokemon}
            fetchPokemonByName={fetchPokemonByName}
          />
        }
      />
      <Route path="/signin" element={<SignInPage onSignInSuccess={login} />} />

      {user ? (
        <Route
          path="/dashboard/*"
          element={
            <Dashboard
              user={user}
              onLogout={logout}
              fetchAllPokemon={fetchAllPokemon}
              fetchPokemonByName={fetchPokemonByName}
            />
          }
        />
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}

export default Routes;
