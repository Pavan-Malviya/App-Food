import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";
import { swiggy_menu_api_URL } from "./constants";
import Cart from "./Cart";

const RestaurantMenu = () => {
  const params = useParams();
  const { id } = params;

  const [restaurantMenu, setRestaurantMenu] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const response = await fetch(swiggy_menu_api_URL + id);
    const restaurantData = await response.json();

    console.log(restaurantData);

    // setRestaurantMenu(restaurantData?.data.cards[2]?.card?.card);
    // console.log(restaurantData?.data.cards[2]?.card?.card);

    async function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        // initialize checkData for Swiggy Restaurant data
        let checkData = restaurantData?.data?.cards[i]?.card?.card?.info;
        console.log(checkData);
        // if checkData is not undefined then return it
        if (checkData !== undefined) {
          return checkData;
        }
      }
    }
    // call the checkJsonData() function which return Swiggy Restaurant data
    const resData = await checkJsonData(restaurantData);
    console.log(resData);
    // update the state variable restaurants with Swiggy API data
    setRestaurantMenu(resData);
  }

  const addToCart = () => {
    if (restaurantMenu) {
      setCartItems([...cartItems, restaurantMenu]);
    }
  };

  return !restaurantMenu ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Restaurant Image */}
            <div className="lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={IMG_CDN_URL + restaurantMenu.cloudinaryImageId}
                  alt={restaurantMenu.name}
                  className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Restaurant Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {restaurantMenu.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{restaurantMenu.avgRating}</span>
                  </div>
                  <span className="text-gray-600 font-medium">{restaurantMenu.costForTwoMessage}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{restaurantMenu.areaName}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {restaurantMenu.cuisines.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="w-8 h-8 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Menu
            </h2>
            <button
              onClick={addToCart}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantMenu.cuisines.map((cuisine, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-orange-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-800 font-medium text-lg">{cuisine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cart Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Cart cartItems={cartItems} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
