import React, { useState, useEffect } from "react";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { swiggy_api_URL } from "./constants";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(swiggy_api_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
        return [];
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData || []);
      setFilteredRestaurants(resData || []);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delicious Food Delivered
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order from your favorite restaurants
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-12 pr-4 py-4 text-gray-700 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => {
                  const filteredData = allRestaurants.filter((restaurant) =>
                    restaurant?.info?.name
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurants(filteredData);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Restaurants</h2>
          <p className="text-gray-600">Discover amazing food near you</p>
        </div>
        
        {loading ? (
          <Shimmer />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load restaurants</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={getRestaurant}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filterRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterRestaurants.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Card {...restaurant.info} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({
  name,
  locality,
  costForTwoString,
  cloudinaryImageId,
  slaString,
  avgRating,
  cuisines,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {avgRating || '4.0'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{name}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {locality}
          </p>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 truncate">
            {cuisines?.slice(0, 3).join(', ') || 'Various cuisines'}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            {costForTwoString || '₹300 for two'}
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {slaString || '30 mins'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
