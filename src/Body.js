import React, { useState, useEffect } from "react";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    try {
      const response = await fetch(
        "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D20.7131695%26lng%3D76.5650829%26page_type%3DDESKTOP_WEB_LISTING"
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      const cardsData =
        data?.data?.cards[1]?.card?.card.gridElements.infoWithStyle.restaurants;
      console.log("cards data", cardsData);
      if (cardsData) {
        // Set allRestaurants to the first 12 cards in the array
        setAllRestaurants(cardsData.slice(0, 12));

        // Set filterRestaurants to the entire cards array
        setFilterRestaurants(cardsData.slice(0, 12));

        // Now you can use allRestaurants and filterRestaurants as per your requirements
      }
      // setAllRestaurants(data?.data?.cards[0]?.data?.data?.cards);
      // setFilterRestaurants(data?.data?.cards[0]?.data?.data?.cards);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-4 m-4">
      <div className="flex justify-center gap-2">
        <input
          className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-4 text-white border-none"
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 text-white"
          onClick={() => {
            const filteredData = allRestaurants.filter((restaurant) =>
              restaurant?.info?.name
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase())
            );
            setFilterRestaurants(filteredData);
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
