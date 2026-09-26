const API_BASE_URL = "https://pokeapi.co/api/v2";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchPokemonByName = (pokemonName) => {
  return fetch(`${API_BASE_URL}/pokemon/${pokemonName.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Pokemon not found: ${pokemonName}`);
      }

      return response.json();
    })
    .then((data) => ({
      name: data.name,
      id: data.id,
      sprite: data.sprites.front_default,
      imageUrl:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    }))
    .catch((error) => {
      console.error("Error fetching pokemon:", error);
      return null;
    });
};

export const fetchAllPokemon = (limit = 151) => {
  return fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=0`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Pokemon list request failed with status ${response.status}`,
        );
      }

      return response.json();
    })
    .then((data) =>
      data.results.map((pokemon, index) => ({
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        id: index + 1,
        url: pokemon.url,
      })),
    )
    .catch((error) => {
      console.error("Error fetching pokemon list:", error);
      return [];
    });
};

export const fetchFeaturedPokemon = (offset = 0, limit = 3) => {
  return fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .then((data) =>
      data.results.map((item, index) => ({
        id: offset + index + 1,
        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        url: item.url,
      })),
    )
    .then((pokemonList) =>
      Promise.all(
        pokemonList.map((pokemon) =>
          fetch(pokemon.url)
            .then(handleResponse)
            .then((detailData) => ({
              id: pokemon.id,
              name: pokemon.name,
              sprite: detailData.sprites.front_default,
              imageUrl:
                detailData.sprites.other["official-artwork"].front_default ||
                detailData.sprites.front_default,
              type: detailData.types[0]?.type?.name || "normal",
            })),
        ),
      ),
    )
    .catch((error) => {
      console.error("Error fetching featured pokemon:", error);
      return [];
    });
};

export const getRandomPokemon = () => {
  const randomId = Math.floor(Math.random() * 151) + 1;

  return fetch(`${API_BASE_URL}/pokemon/${randomId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Random pokemon request failed with status ${response.status}`,
        );
      }

      return response.json();
    })
    .then((data) => ({
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      id: data.id,
      sprite: data.sprites.front_default,
      imageUrl:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    }))
    .catch((error) => {
      console.error("Error fetching random pokemon:", error);
      return null;
    });
};
