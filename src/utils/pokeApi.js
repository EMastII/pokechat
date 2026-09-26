// PokéAPI utilities
export const fetchPokemonByName = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
    );
    if (!response.ok) {
      throw new Error(`Pokemon not found: ${pokemonName}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      sprite: data.sprites.front_default,
      imageUrl:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    };
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return null;
  }
};

export const fetchAllPokemon = async (limit = 151) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
    );
    const data = await response.json();
    return data.results.map((pokemon, index) => ({
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      id: index + 1,
      url: pokemon.url,
    }));
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
};

export const getRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`,
    );
    const data = await response.json();
    return {
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      id: data.id,
      sprite: data.sprites.front_default,
      imageUrl:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    };
  } catch (error) {
    console.error("Error fetching random pokemon:", error);
    return null;
  }
};
