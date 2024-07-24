import React from "react";

interface NightModeButtonProps {
  toggleTheme: () => void;
  theme: string;
}

const NightModeButton: React.FC<NightModeButtonProps> = ({ toggleTheme, theme }) => {
  return (
    <button onClick={toggleTheme} className="fixed bottom-4 right-4 bg-blue-500 text-white p-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
};

export default NightModeButton;
