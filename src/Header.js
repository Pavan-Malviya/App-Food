import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [islogedin, setIsLogedIn] = useState(true);

  return (
    <div className="bg-black text-white flex justify-between shadow-md sticky top-0"  >

      <img className="w-16 p-2 m-2"
        src="https://png.pngtree.com/png-vector/20220727/ourmid/pngtree-food-logo-png-image_6089719.png"

      ></img>

      <h1 className="title"></h1>

      <div className="nav-item">
        <ul className="flex p-3 m-3" >
          <li className="pl-2"><Link to="/"  >Home</Link></li>
          <li className="pl-2" ><Link to="/About">About us </Link></li>
          <li className="pl-2"><Link to="/Contact">Contact</Link></li>
          <li className="pl-2">Cart</li>
        </ul>
      </div>
      <div className="p-3 m-3">
        {islogedin ? (
          <button onClick={() => setIsLogedIn(false)}>Login</button>
        ) : (
          <button onClick={() => setIsLogedIn(true)}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Header;
