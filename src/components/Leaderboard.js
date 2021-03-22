import axios from "axios";
import React, { useState, useEffect } from "react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    const GetLeaderboard = () => {
        axios.get("/api/users/leaderboard")
            .then(res => {
                setUsers(res.data);
            })
    }

    useEffect(() => {
        GetLeaderboard();
    })

    return(
        <div>
            <h3>Leaderboard</h3>
            <ol>
                {users.map((user) => {
                    return <li key={user._id}>{user.username}: {user.score}</li>
                })}
            </ol>
        </div>
    )
}

export default Leaderboard;