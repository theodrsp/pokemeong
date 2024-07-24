import React, { useState } from 'react';
import { getPokemonDetail, getPokemons } from '../services/pokeApi';

import Modal from '../components/Modal';

interface GatchaPageProps {
  addToBag: (item: { id: number; name: string; nickname: string; imageUrl: string }) => void;
}

const GatchaPage: React.FC<GatchaPageProps> = ({ addToBag }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [pokemon, setPokemon] = useState<{ id: number; name: string; imageUrl: string } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleGatcha = async () => {
    setIsOpening(true);
    setPokemon(null);
    setShowModal(false);

    setTimeout(async () => {
      const offset = Math.floor(Math.random() * 1000);
      const data = await getPokemons(1, offset);
      const randomPokemon = data.results[0];
      const pokemonDetail = await getPokemonDetail(randomPokemon.name);
      setPokemon({
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        imageUrl: pokemonDetail.sprites.front_default,
      });
      setIsOpening(false);
      setShowModal(true);
    }, 3000);
  };

  const handleAddToBag = () => {
    if (pokemon) {
      const nickname = prompt('Enter a nickname for your new Pokémon:', pokemon.name);
      addToBag({ ...pokemon, nickname: nickname || pokemon.name });
      setPokemon(null);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">Selamat Datang Pemain Hebat!</h1>
      <p className="mb-8 text-center">Silahkan uji keberuntunganmu disini!</p>
      <div className="relative">
        {isOpening && <div className="pokeball-animation">Opening...</div>}
        {!isOpening && !pokemon && (
          <button
            onClick={handleGatcha}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Open Poké Ball
          </button>
        )}
      </div>
      {showModal && pokemon && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col items-center">
            <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32" />
            <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
            <div className="mt-4">
              <button
                onClick={handleAddToBag}
                className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2"
              >
                Add to Bag
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Kembali
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GatchaPage;
