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
    // Ensure that restaurantMenu is not null before adding to the cart
    if (restaurantMenu) {
      setCartItems([...cartItems, restaurantMenu]);
      console.log(cartItems);
      return <Cart cartItems={cartItems} />;
    }
  };

  return !restaurantMenu ? (
    <Shimmer />
  ) : (
    <div>
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-900 p-5 m-4 rounded-md">
          <img
            src={IMG_CDN_URL + restaurantMenu.cloudinaryImageId}
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-800 p-6"
          />
          <div className="p-6 space-y-2 lg:col-span-5 text-gray-100">
            <h3 className="text-2xl font-semibold sm:text-4xl">
              {restaurantMenu.name}
            </h3>
            <span className="text-xs dark:text-gray-200">
              {restaurantMenu.cuisines.join(" , ")}
            </span>
            <p>{restaurantMenu.areaName}</p>
            <p>{restaurantMenu.costForTwoMessage}</p>
            <p>{restaurantMenu.avgRating}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-2 m-2">
          <h1 className="font-bold">Menu</h1>
          <ul
            className="menu bg-base-100 w-56 h-56 p-2 rounded-box"
            style={{ listStyleType: "none" }}
          >
            {restaurantMenu.cuisines.map((cuisine, index) => (
              <li className="p-1 m-2" key={index}>
                {cuisine}
              </li>
            ))}
          </ul>
          <button
            className="bg-slate-400 border p-2 text-white rounded "
            onClick={addToCart}
          >
            Add To Cart
          </button>
          <Cart cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
