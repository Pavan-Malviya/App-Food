import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [islogedin, setIsLogedIn] = useState(true);

  return (
    <div className=" sticky top-0 w-full h-12 flex justify-between items-center px-2 text-gray-200 bg-gradient-to-r from-fuchsia-500 to-cyan-500"  >

      <div>
        <img style={{ width: '40px' }}
          src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-food-logo-png-image_6089719.png"

        ></img>
      </div >

      <h1 className="title"></h1>

      <div className="nav-item">
        <ul className="flex" >
          <li className="p-1"><Link to="/"  >Home</Link></li>
          <li className="p-1" ><Link to="/About">About us </Link></li>
          <li className="p-1"><Link to="/Contact">Contact</Link></li>
          <li className="p-1">Cart</li>
        </ul>
      </div>
      <div className="p-1">
        {islogedin ? (
          <button onClick={() => setIsLogedIn(false)}>Login</button>
        ) : (
          <button onClick={() => setIsLogedIn(true)}>Logout</button>
        )}
      </div>
    </div >
  );
};

export default Header;
