import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import { Pokemon } from "../services/types";
import { getPokemonDetail } from "../services/pokeApi";
import { useParams } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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
    return <p>Loading...</p>;
  }

  const data = {
    labels: pokemon.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: "Stat Value",
        data: pokemon.stats.map((stat) => stat.base_stat),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${pokemon.name.toUpperCase()} Stats`,
        font: {
          size: 24,
        },
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 capitalize">{pokemon.name}</h1>
      <div className="flex justify-center items-center mb-4">
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-64 h-64" />
      </div>
      <div className="w-full h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PokemonDetailPage;
