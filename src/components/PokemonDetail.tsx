import React, { useEffect, useState } from "react";

import { getPokemonDetail } from "../services/pokeApi";
import { useParams } from "react-router-dom";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetail {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: { type: { name: string } }[];
}

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      if (name) {
        const data = await getPokemonDetail(name);
        setPokemon(data);
      }
    };
    fetchPokemonDetail();
  }, [name]);

  if (!pokemon) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-center">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32" />
        </div>
        <h1 className="text-center text-3xl font-bold capitalize mt-4 dark:text-white">{pokemon.name}</h1>
        <div className="text-center mt-4">
          <span className="text-lg font-medium dark:text-gray-200">ID: </span>
          <span className="text-lg dark:text-gray-300">{pokemon.id}</span>
        </div>
        <div className="text-center mt-4">
          <span className="text-lg font-medium dark:text-gray-200">Height: </span>
          <span className="text-lg dark:text-gray-300">{pokemon.height}</span>
        </div>
        <div className="text-center mt-4">
          <span className="text-lg font-medium dark:text-gray-200">Weight: </span>
          <span className="text-lg dark:text-gray-300">{pokemon.weight}</span>
        </div>
        <div className="text-center mt-4">
          <span className="text-lg font-medium dark:text-gray-200">Types: </span>
          {pokemon.types.map((type) => (
            <span key={type.type.name} className="text-lg dark:text-gray-300 capitalize">
              {type.type.name}{" "}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold dark:text-white">Stats</h2>
          <ul className="mt-4 space-y-2">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="flex justify-between">
                <span className="capitalize dark:text-gray-300">{stat.stat.name}</span>
                <span className="dark:text-gray-300">{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
