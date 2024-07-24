import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(`${API_URL}/pokemon`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

export const getPokemonDetail = async (name: string) => {
  const response = await axios.get(`${API_URL}/pokemon/${name}`);
  return response.data;
};
