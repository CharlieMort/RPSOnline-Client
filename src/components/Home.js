import React from "react";
import { Link } from "react-router-dom";

const Home = ({user}) => {
    return(
        <div>
            <h1>This Is The HomePage</h1>
            {user.username
            ? <Link to="/game">Create/Join Room</Link>
            : <Link to="/login">Sign In/Up</Link>
            }
        </div>
    )
}

export default Home;