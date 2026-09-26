import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = ({ fetchFeaturedPokemon }) => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchFeaturedPokemon(0, 3);
        setPokemonList(data);
      } catch {
        setError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const visiblePokemon = pokemonList.slice(0, visibleCount);
  const hasMorePokemon = pokemonList.length >= visibleCount;

  const handleShowMore = async () => {
    if (loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);
      const nextBatch = await fetchFeaturedPokemon(pokemonList.length, 3);
      setPokemonList((current) => [...current, ...nextBatch]);
      setVisibleCount((current) => current + 3);
    } catch {
      setError(
        "Sorry, we could not load the next set of Pokémon. Please try again in a moment.",
      );
    } finally {
      setLoadingMore(false);
    }
  };

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
          <div className="featured-pokemon-panel">
            <h2>Featured Pokémon</h2>

            {loading && (
              <div className="api-status" aria-live="polite">
                <div className="loader" aria-label="Loading content" />
                <p>Loading Pokémon...</p>
              </div>
            )}

            {!loading && error && (
              <p className="api-status api-error" aria-live="assertive">
                {error}
              </p>
            )}

            {!loading && !error && pokemonList.length === 0 && (
              <p className="api-status api-empty">Nothing found</p>
            )}

            {!loading && !error && pokemonList.length > 0 && (
              <>
                <div className="pokemon-cards">
                  {visiblePokemon.map((pokemon) => (
                    <article key={pokemon.id} className="pokemon-card">
                      <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        className="pokemon-card-image"
                      />
                      <h3>{pokemon.name}</h3>
                      <span>{pokemon.type}</span>
                    </article>
                  ))}
                </div>

                {hasMorePokemon && (
                  <button
                    type="button"
                    className="show-more-button"
                    onClick={handleShowMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "Show more"}
                  </button>
                )}
              </>
            )}
          </div>

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
