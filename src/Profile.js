import { useEffect, useState } from "react";
import { Github_API_User } from "./constants";

const Profile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getprofile();
    }, []);

    async function getprofile() {
        const data = await fetch(Github_API_User);
        const json = await data.json();
        console.log(json);
        setProfile(json);


    }


    return (
        <div className="flex justify-center">
            <div className="">
                <img className="m-4" src={profile.avatar_url} alt="" style={{ width: "200px", borderRadius: "20%" }} />
                <h1 className="m-4 pl-2 font-bold">{profile.name}</h1>
            </div>
        </div>


    );
};

export default Profile;