import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="text-gray-600 body-font">
      <div className="container shadow-sm mx-auto flex  md:flex-row items-center p-2">
        <a className="w-[50px] mr-5">
          <img
            className="" // Full width on small screens, auto on larger
            src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-food-logo-png-image_6089719.png"
            alt="Logo"
          />
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900" href="/">
            Home
          </a>
          <a className="mr-5 hover:text-gray-900" href="/About">
            About Us
          </a>
          <a className="mr-5 hover:text-gray-900" href="/Contact">
            Contact
          </a>
        </nav>
        <div className="p-1 ml-5">
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>Login</button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)}>Logout</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
