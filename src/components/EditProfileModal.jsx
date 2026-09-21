import React, { useState, useEffect } from "react";
import { fetchAllPokemon, fetchPokemonByName } from "../utils/pokeApi";
import { updateProfile } from "../utils/api";
import ChangePasswordModal from "./ChangePasswordModal";
import "./EditProfileModal.css";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    favoritePokemon: user.favoritePokemon,
  });

  const [selectedPokemon, setSelectedPokemon] = useState(
    user.pokemonData || null,
  );
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPokemonDropdown, setShowPokemonDropdown] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);

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

    if (!formData.name || !formData.email || !formData.favoritePokemon) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const updatedUser = await updateProfile(user.id, {
        name: formData.name,
        email: formData.email,
        favoritePokemon: formData.favoritePokemon,
        pokemonData: selectedPokemon,
      });

      onSave(updatedUser);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <p>
            Update your trainer profile details and favorite companion settings.
          </p>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-field">
              <input type="password" value="••••••••••" disabled readOnly />
              <button
                type="button"
                className="btn-change-password"
                onClick={() => setShowChangePassword(true)}
              >
                Change password
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Favorite Pokémon</label>
            <div className="pokemon-input-container">
              <div className="pokemon-input-wrapper">
                <input
                  type="text"
                  name="favoritePokemon"
                  value={formData.favoritePokemon}
                  onChange={(e) => {
                    handlePokemonSearch(e.target.value);
                    setShowPokemonDropdown(true);
                  }}
                  onFocus={() => setShowPokemonDropdown(true)}
                  disabled={loading}
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

          <div className="button-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {showChangePassword && (
        <ChangePasswordModal
          userId={user.id}
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setShowChangePassword(false);
            setError("Password changed successfully!");
          }}
        />
      )}
    </div>
  );
};

export default EditProfileModal;
