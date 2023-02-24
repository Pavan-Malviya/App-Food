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
        <div>
            <img src={profile.avatar_url} alt="" style={{ width: "200px", borderRadius: "20%" }} />
            <h1>{profile.name}</h1>
        </div>


    );
};

export default Profile;