import React, { useEffect, useState } from 'react';
import { getPokemonDetail, getPokemons } from '../services/pokeApi';

import PokemonCard from '../components/PokemonCard';

interface HomePageProps {
  addToBag: (pokemon: { id: number; name: string; nickname: string; imageUrl: string }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToBag }) => {
  const [pokemons, setPokemons] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const data = await getPokemons(20, (page - 1) * 20);
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: { name: string }) => {
          const detail = await getPokemonDetail(pokemon.name);
          return {
            id: detail.id,
            name: detail.name,
          };
        })
      );
      setPokemons(detailedPokemons);
      setLoading(false);
    };

    fetchPokemons();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              addToBag={addToBag}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mx-2"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
