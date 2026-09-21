import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-container">
        <section className="pokemon-section" aria-labelledby="home-title">
          <div className="pokemon-grid" aria-label="Featured Pokémon gallery">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              alt="Bulbasaur"
              className="pokemon-bg-1"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
              alt="Charmander"
              className="pokemon-bg-2"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
              alt="Squirtle"
              className="pokemon-bg-3"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu"
              className="pokemon-bg-4"
            />
          </div>
          <h1 id="home-title">PokéChat</h1>
          <p>Team Communication</p>
        </section>

        <section className="auth-section" aria-label="Authentication options">
          <div className="button-group">
            <button className="btn-signin" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
