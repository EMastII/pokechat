import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPokemon, fetchPokemonByName } from "../utils/pokeApi";
import { signUp } from "../utils/api";
import "./AuthPages.css";

const SignUpPage = ({ onSignUpSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    favoritePokemon: "",
  });

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPokemonDropdown, setShowPokemonDropdown] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    loadPokemonList();
  }, []);

  const loadPokemonList = async () => {
    setLoading(true);
    const pokemon = await fetchAllPokemon(151);
    setPokemonList(pokemon);
    setFilteredPokemon(pokemon);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePokemonSearch = (value) => {
    setFormData((prev) => ({
      ...prev,
      favoritePokemon: value,
    }));

    if (value === "") {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredPokemon(filtered);
    }
  };

  const selectPokemon = async (pokemon) => {
    setFormData((prev) => ({
      ...prev,
      favoritePokemon: pokemon.name,
    }));

    const pokemonData = await fetchPokemonByName(pokemon.name);
    setSelectedPokemon(pokemonData);
    setShowPokemonDropdown(false);
  };

  const handleRandomPokemon = async () => {
    const randomPokemon =
      pokemonList[Math.floor(Math.random() * pokemonList.length)];
    selectPokemon(randomPokemon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.favoritePokemon
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const user = await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        favoritePokemon: formData.favoritePokemon,
        pokemonData: selectedPokemon,
      });

      onSignUpSuccess(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Sign up</h2>
          <p>Please enter your credentials to access your account.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ash Ketchum"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="username@example.com"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-pokemon">Favorite Pokémon</label>
            <div className="pokemon-input-container">
              <div className="pokemon-input-wrapper">
                <input
                  id="signup-pokemon"
                  type="text"
                  name="favoritePokemon"
                  value={formData.favoritePokemon}
                  onChange={(e) => {
                    handlePokemonSearch(e.target.value);
                    setShowPokemonDropdown(true);
                  }}
                  onFocus={() => setShowPokemonDropdown(true)}
                  placeholder="Select Pokémon by name or select Random Pokémon"
                  disabled={loading}
                  required
                />
                {showPokemonDropdown && formData.favoritePokemon && (
                  <div className="pokemon-dropdown">
                    {filteredPokemon.map((pokemon) => (
                      <div
                        key={pokemon.id}
                        className="pokemon-option"
                        onClick={() => selectPokemon(pokemon)}
                      >
                        {pokemon.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn-random"
                onClick={handleRandomPokemon}
                disabled={loading}
              >
                Random Pokémon
              </button>
            </div>
          </div>

          {selectedPokemon && (
            <div className="selected-pokemon">
              <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
              <p>{selectedPokemon.name}</p>
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")} className="link-btn">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
