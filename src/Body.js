import React, { useState, useEffect } from "react";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { swiggy_api_URL } from "./constants";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    try {
      const response = await fetch(swiggy_api_URL);
      console.log(response, "here");
      const json = await response.json();
      console.log(json);

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
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
      console.log(resData);
      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 m-4">
      <div className="flex justify-center gap-2">
        <input
          className="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="bg-black hover:bg-white text-white hover:text-black border hover:border-black font-bold py-2 px-4 rounded"
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

      <div className="flex justify-center flex-wrap w-full p-4 m-1">
        {filterRestaurants.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant.info.id}
            key={restaurant.info.id}
            style={{ textDecoration: "none" }}
          >
            <Card {...restaurant.info} />
          </Link>
        ))}
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
}) => {
  return (
    <div className="max-w-xs h-75 m-3 p-6 rounded-md shadow-md bg-gray-900 text-gray-50">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt=""
        className="object-cover object-center w-full rounded-md h-60 dark:bg-gray-500"
      />
      <div className="mt-6 mb-2">
        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400">
          {locality}
        </span>
        <h2 className="text-xl font-semibold tracking-wide">{name}</h2>
      </div>
      <p className="dark:text-gray-100">{slaString}</p>
    </div>
  );
};

export default Body;
