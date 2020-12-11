import React from "react";
import { Link } from "react-router-dom";

import './Home.css';

const Home = () => {

    return (
        <div className="welcomeDiv">
            <div className="contentDiv">
                <img src="./redoverlay.png" alt="logo" className="App-logo"/>
                
                <div className="homePDiv">
                    <div className="homeText">
                    <p>Welcome to <em>Bookly</em>! Our mission is to bring together the stories & the people you love. Sign up to get started with your own virtual bookclub!</p>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;