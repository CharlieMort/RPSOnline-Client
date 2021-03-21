import React, {useState} from "react";
import { Redirect } from "react-router";

const JoinOrCreate = ({socket, roomCode}) => {
    const [joinCode, setJoinCode] = useState("");

    const CreateRoom = () => {
        console.log("Creating Room");
        socket.emit("create_room");
    }
    
    const JoinRoom = () => {
        console.log("Joining Room");
        socket.emit("join_room", joinCode);
    }

    if (roomCode !== "") {
        let link = `/game/${roomCode}`;
        return <Redirect to={link} />
    }

    return(
        <div>
            <button onClick={JoinRoom}>Join Room</button>
            <input type="text" placeholder="Room Code..." value={joinCode} onChange={(e) => setJoinCode(e.target.value)}></input>
            <button onClick={CreateRoom}>Create Room</button>
        </div>
    )
}

export default JoinOrCreate;