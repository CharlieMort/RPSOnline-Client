import React from "react";
import { Link } from "react-router-dom";

const Home = ({user}) => {
    return(
        <div>
            {user.username
            ? <Link className="btn btn-primary" to="/game">Create/Join Room</Link>
            : <Link className="btn btn-primary" to="/login">Sign In/Up</Link>
            }
        </div>
    )
}

export default Home;