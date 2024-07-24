import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import BagPage from "./pages/BagPage";
import Footer from "./components/Footer";
import GatchaPage from "./pages/GatchaPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import NightModeButton from "./components/NightModeButton";
import PokemonDetailPage from "./pages/PokemonDetailPage";

interface BagItem {
  id: number;
  name: string;
  nickname: string;
  imageUrl: string;
}

const App: React.FC = () => {
  const [bag, setBag] = useState<BagItem[]>(() => {
    const savedBag = localStorage.getItem("pokemonBag");
    return savedBag ? JSON.parse(savedBag) : [];
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("pokemonBag", JSON.stringify(bag));
  }, [bag]);

  const addToBag = (item: BagItem) => {
    setBag([...bag, item]);
  };

  const removeFromBag = (id: number) => {
    setBag(bag.filter((item) => item.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <Navbar />
      <div className={theme === "light" ? "bg-white text-black min-h-screen" : "bg-gray-900 text-white min-h-screen"}>
        <Routes>
          <Route path="/" element={<HomePage addToBag={addToBag} />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/bag" element={<BagPage bag={bag} removeFromBag={removeFromBag} />} />
          <Route path="/gatcha" element={<GatchaPage addToBag={addToBag} />} />
        </Routes>
      </div>
      <NightModeButton toggleTheme={toggleTheme} theme={theme} />
      <Footer />
    </Router>
  );
};

export default App;
