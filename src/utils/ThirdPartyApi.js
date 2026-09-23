const API_BASE_URL = "https://pokeapi.co/api/v2";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchFeaturedPokemon = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=12&offset=0`);
    const data = await handleResponse(response);

    const pokemonList = data.results.map((item, index) => ({
      id: index + 1,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      url: item.url,
    }));

    const detailedPokemon = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await handleResponse(detailResponse);

        return {
          id: pokemon.id,
          name: pokemon.name,
          sprite: detailData.sprites.front_default,
          imageUrl:
            detailData.sprites.other["official-artwork"].front_default ||
            detailData.sprites.front_default,
          type: detailData.types[0]?.type?.name || "normal",
        };
      }),
    );

    return detailedPokemon;
  } catch (error) {
    throw error;
  }
};
