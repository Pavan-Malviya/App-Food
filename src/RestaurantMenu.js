import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./constants";
import Shimmer from "./Shimmer";
import { swiggy_menu_api_URL } from "./constants";



const RestaurantMenu = () => {
    const params = useParams();
    const { id } = params;


    const [restaurantmenu, setRestaurantMenu] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
        const data = await fetch(swiggy_menu_api_URL + id);
        const json = await data.json();
        console.log(json);
        setRestaurantMenu(json.data);

    }


    return (!restaurantmenu) ? <Shimmer /> : (
        <div>
            <div>
                <div className="flex m-4 p-4 bg-gradient-to-r from-red-500 to-orange-500  rounded-md">
                    <img className="w-52 h-50 rounded-md" src={IMG_CDN_URL + restaurantmenu.cloudinaryImageId} />
                    <div className="px-4 text-gray-300">
                        <h1 className="font-bold">{restaurantmenu.name}</h1>
                        <h4 className="p-2" >{restaurantmenu.cuisines.join(" , ")}</h4>
                        <h4 className="p-2">{restaurantmenu.area}</h4>

                        <h4 className="p-2">{restaurantmenu.costForTwoMsg}</h4>

                        <h4 className="p-2">{restaurantmenu.avgRating} Star </h4>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="p-2 m-2">
                        <h1 className="font-bold">Menu</h1>
                        <ul className="overflow-y-scroll overscroll-y-contain" style={{ listStyleType: "none" }}>
                            {
                                Object.values(restaurantmenu.menu.items).map((item) => <li className="p-1 m-2" key={item.id}>{item.name} : {item.category}</li>)
                            }
                        </ul>


                    </div>

                </div>


            </div>

        </div>
    );
};

export default RestaurantMenu;