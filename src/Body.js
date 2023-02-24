import { useState } from "react";
import { IMG_CDN_URL } from "./constants";
import { restaurantList } from "./constants";
import Shimmer from "./Shimmer";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { swiggy_api_URL } from "./constants";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");

  const [searchText, setsearchText] = useState("");

  //empty dependency array ==> once after render
  //dep array [searchText] ==> once after initial render
  useEffect(() => {
    //API call
    getRestaurant();
  }, []);

  async function getRestaurant() {
    const data = await fetch(swiggy_api_URL);
    // https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.7131695&lng=76.5650829&page_type=DESKTOP_WEB_LISTING

    const json = await data.json();
    console.log(json);
    setAllRestaurants(json.data?.cards[2]?.data?.data?.cards);
    setFilterRestaurants(json.data?.cards[2]?.data?.data?.cards);
  }

  // use searchData function and set condition if data is empty show error message
  // const searchData = (searchText, restaurants) => {
  //   if (searchText !== "") {
  //     const data = filterData(searchText, restaurants);
  //     setFilterRestaurants(data);
  //     setErrorMessage("");
  //     if (data.length === 0) {
  //       <h4>No match</h4>;
  //     }
  //   } else {
  //     setErrorMessage("");
  //     setFilterRestaurants(restaurants);
  //   }
  // };

  // if allRestaurants is empty don't render restaurants cards
  // if (!allRestaurants) return null;

  return (
    <div>
      <div className="in-sea">
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            //need to filter the data
            //here filterData took variable (searchText, restaurants)
            const data = filterData(searchText, allRestaurants);
            //update the state of the restaurants
            setFilterRestaurants(data);
          }}
        >
          Search
        </button>


      </div>

      {allRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex">
          {filterRestaurants.map((restaurant) => {
            return <Link to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id} style={{ textDecoration: "none" }}> <Card {...restaurant.data} /></Link>;
          })}
        </div>
      )}
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
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId}></img>
      <h3>{name}</h3>
      <h5>{locality}</h5>
      <h5>{slaString}</h5>
    </div>
  );
};

export default Body;
