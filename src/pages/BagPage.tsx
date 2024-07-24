import PokemonCard from '../components/PokemonCard';
import React from 'react';

interface BagPageProps {
  bag: { id: number; name: string; nickname: string; imageUrl: string }[];
  removeFromBag: (id: number) => void;
}

const BagPage: React.FC<BagPageProps> = ({ bag, removeFromBag }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your Bag</h1>
      <div className="flex flex-wrap justify-center">
        {bag.map((pokemon) => (
          <div key={pokemon.id} className="relative m-4">
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              nickname={pokemon.nickname}
              imageUrl={pokemon.imageUrl}
            />
            <button
              onClick={() => removeFromBag(pokemon.id)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              ✖️
            </button>
          </div>
        ))}
      </div>
      {bag.length === 0 && <p>Your bag is empty. Catch some Pokémon!</p>}
    </div>
  );
};

export default BagPage;
