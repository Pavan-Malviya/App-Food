import Profile from "./Profile";

const About = () => {
    return (
        <div className="about">
            <div >
                <h1>Food-App</h1>
                <p>Founded in 2023</p>
            </div>
            <Profile style={{ margin: "10px", padding: "10px" }} />

        </div>
    );
};

export default About;