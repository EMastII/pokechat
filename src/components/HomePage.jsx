import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="pokemon-section">
          <div className="pokemon-grid">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              alt="Pokemon"
              className="pokemon-bg-1"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
              alt="Pokemon"
              className="pokemon-bg-2"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
              alt="Pokemon"
              className="pokemon-bg-3"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pokemon"
              className="pokemon-bg-4"
            />
          </div>
          <h1>PokéChat</h1>
          <p>Team Communication</p>
        </div>

        <div className="auth-section">
          <div className="button-group">
            <button className="btn-signin" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
