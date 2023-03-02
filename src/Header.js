import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [islogedin, setIsLogedIn] = useState(true);
  //className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img style={{ width: '50px' }}
              src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-food-logo-png-image_6089719.png"

            ></img>
            <span className="ml-3 text-xl"></span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900"><Link to="/"  >Home</Link></a>
            <a className="mr-5 hover:text-gray-900"><Link to="/About">About us </Link></a>
            <a className="mr-5 hover:text-gray-900"><Link to="/Contact">Contact</Link></a>
            <a className="mr-5 hover:text-gray-900"><Link to="/Contact">Contact</Link></a>
          </nav>
          <div className="p-1">
            {islogedin ? (
              <button onClick={() => setIsLogedIn(false)}>Login</button>
            ) : (
              <button onClick={() => setIsLogedIn(true)}>Logout</button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
