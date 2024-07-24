import { Link } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 dark:bg-gray-800 p-6 shadow-lg">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="mx-4 text-2xl text-white font-bold">
          Home
        </Link>
        <Link to="/bag" className="mx-4 text-2xl text-white font-bold">
          Bag
        </Link>
        <Link to="/gatcha" className="mx-4 text-2xl text-white font-bold">
          Gatcha
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
