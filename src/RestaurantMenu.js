import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";


const RestaurantMenu = () => {
    const params = useParams();
    const { id } = params;


    const [restaurantmenu, setRestaurantMenu] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
        const data = await fetch("https://www.swiggy.com/dapi/menu/v4/full?lat=20.7131695&lng=76.5650829&menuId=" + id);
        const json = await data.json();
        console.log(json);
        setRestaurantMenu(json.data);

    }


    return (!restaurantmenu) ? <Shimmer /> : (
        <div>
            <div>
                <div className="menu1">
                    <img src={IMG_CDN_URL + restaurantmenu.cloudinaryImageId} />
                    <div>
                        <h2>{restaurantmenu.name}</h2>
                        <h4>{restaurantmenu.cuisines.join(" , ")}</h4>
                        <h4>{restaurantmenu.area}</h4>

                        <h4>{restaurantmenu.costForTwoMsg}</h4>

                        <h4>{restaurantmenu.avgRating} Star </h4>
                    </div>
                </div>
                <div className="menu">
                    <div>
                        <h1>Menu</h1>
                        <ul style={{ listStyleType: "none" }}>
                            {
                                Object.values(restaurantmenu.menu.items).map((item) => <li key={item.id}>{item.name} : {item.category}</li>)
                            }
                        </ul>


                    </div>

                </div>


            </div>

        </div>
    );
};

export default RestaurantMenu;