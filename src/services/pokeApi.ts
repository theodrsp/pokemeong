import axios from 'axios';

export const getPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getPokemonDetail = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};
