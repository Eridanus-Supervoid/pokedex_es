import axios from 'axios';

const getPokemon = async pokemonId => {
  try {
    const [{ data }, { data: species }] = await Promise.all([
      axios(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
      axios(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
    ]);

    const flavorTextEntry = species.flavor_text_entries.findIndex(i => {
      return i.language.name === 'es' && i.version.name === 'alpha-sapphire';
    });

    data.flavor_text = species.flavor_text_entries[flavorTextEntry].flavor_text;

    data.dream_image = data.sprites.other.dream_world.front_default;

    return data;
  } catch (e) {
    throw e;
  }
};

const getTypesLang = async pokemonType => {
  pokemonType.tipos = [];
  const data = await Promise.all(
    pokemonType.types.map(async (i, index) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/type/${pokemonType.types[index].type.name}`
      );

      const idTypeLang = data.names.findIndex(i => {
        return i.language.name === 'es';
      });

      pokemonType.tipos = [...pokemonType.tipos, data.names[idTypeLang].name];

      return pokemonType;
  })
  );
  return data[0];
};

const getAllPokemons = async () => {
  try {
    const res = await axios('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = res.data.results.map((i, index) => {
      return {
        id: index + 1,
        name: i.name,
        selected: false,
      };
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export { getPokemon, getAllPokemons, getTypesLang };
