import React, {useState} from "react";
import { Redirect } from "react-router";

const JoinOrCreate = ({socket, roomCode}) => {
    const [joinCode, setJoinCode] = useState("");

    const CreateRoom = () => {
        socket.emit("create_room");
    }
    
    const JoinRoom = () => {
        socket.emit("join_room", joinCode);
    }

    if (roomCode !== "") {
        let link = `/game/${roomCode}`;
        return <Redirect to={link} />
    }

    return(
        <div className="join-create">
            <div>
                <button className="btn btn-primary" onClick={CreateRoom}>Create Game</button>
            </div>
            <div>
                <h5>Or</h5>
            </div>
            <div>
                <input className="form-control" type="text" placeholder="Room Code..." value={joinCode} onChange={(e) => setJoinCode(e.target.value)}></input>
                <button className="btn btn-primary" onClick={JoinRoom}>Join Game</button>
            </div>
        </div>
    )
}

export default JoinOrCreate;