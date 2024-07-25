import { Link } from "react-router-dom";
import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
  nickname?: string;
  addToBag?: (pokemon: { id: number; name: string; nickname: string; imageUrl: string }) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, imageUrl, nickname, addToBag }) => {
  const handleAddToBag = () => {
    if (addToBag) {
      const userNickname = prompt("Enter a nickname for your Pokémon", name);
      if (userNickname) {
        addToBag({ id, name, nickname: userNickname, imageUrl });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-4 w-80 h-80 flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-105">
      <Link to={`/pokemon/${name}`} className="block text-center">
        <img src={imageUrl} alt={name} className="w-full h-48 object-contain mb-2" />
        <h2 className="text-xl font-bold capitalize">{nickname || name}</h2>
      </Link>
      {addToBag && (
        <button onClick={handleAddToBag} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
          Add to Bag
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
