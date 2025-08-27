import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ cartItemCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200">
              Contact
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
              >
                Login
              </button>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Contact
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
