import axios from "axios";
import React, { useState, useEffect } from "react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    const GetLeaderboard = () => {
        axios.get("http://localhost:5000/users/leaderboard")
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
            })
    }

    useEffect(() => {
        GetLeaderboard();
    })

    return(
        <div>
            <h1>Leaderboard</h1>
            <ol>
                {users.map((user) => {
                    return <li key={user._id}>{user.username}: {user.score}</li>
                })}
            </ol>
        </div>
    )
}

export default Leaderboard;