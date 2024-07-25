import React, { useEffect, useState } from "react";

import Pagination from "./Pagination";
import { Pokemon } from "../services/types";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import { getPokemons } from "../services/pokeApi";

interface PokemonListProps {
  addToBag: (item: { id: number; name: string; nickname: string; imageUrl: string }) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ addToBag }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPokemons = async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const data = await getPokemons(limit, offset);
    setPokemons(data.results);
    setTotalPages(Math.ceil(data.count / limit));
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {pokemons.map((pokemon, index) => (
          <PokemonCard 
            key={pokemon.name} 
            id={index + 1} // generate id based on index for example
            name={pokemon.name}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            addToBag={addToBag} 
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PokemonList;
