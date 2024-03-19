import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="w-12">
          <img
            className="w-full" // Full width on small screens, auto on larger
            src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-food-logo-png-image_6089719.png"
            alt="Logo"
          />
        </Link>
        <nav className="flex gap-4 text-base">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-900">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-900">
            Contact
          </Link>
          <Link to="/cart" className="hover:text-gray-900">
            Cart
          </Link>
        </nav>
        <div className="ml-4">
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
