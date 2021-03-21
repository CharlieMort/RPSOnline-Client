import React, { useEffect, useState } from "react";
import axios from "axios";

const Buttons = ({callback}) => {
    return(
        <div>
            <input type="button" value="Rock" onClick={callback} />
            <input type="button" value="Paper" onClick={callback} />
            <input type="button" value="Scissors" onClick={callback} />
        </div>
    )
}

const Win = ({winner, restart}) => {
    return(
        <div>
            <h1>{winner}</h1>
            <button onClick={restart}>Restart?</button>
        </div>
    )
}

const Outcome = ({choice, winner, socketID, restart}) => {
    if (winner) {
        if (winner === socketID) {
            winner = "You WON !!!";
        }
        else if (winner === "draw") {
            winner = "It Was A Draw :|"
        }
        else winner = "You LOST :(";
    }

    return(
        <div>
            {
                winner
                ? <Win winner={winner} restart={restart} />
                : <h1>You Chose: {choice}</h1>
            }
        </div>
    )
}

const Game = ( {socket, roomCode, socketID, user} ) => {
    const [choice, setChoice] = useState("");
    const [winner, setWinner] = useState("");

    useEffect(() => {
        socket.on("winner", (data) => {
            console.log(data);
            setWinner(data);
            if (data == socketID) {
                axios.post(`http://localhost:5000/users/addscore/${user._id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        })
        socket.on("restartServer", () => {
            setChoice("");
            setWinner("");
        })
    }, []);

    const pickChoice = (e) => {
        setChoice(e.target.value);
        console.log(e.target.value);
        socket.emit("choose", e.target.value, roomCode);
    }

    const restart = () => {
        socket.emit("restart", roomCode);
        setChoice("");
        setWinner("");
    }

    return (
        <div>
            <h1>Your Room Code Is:{roomCode}</h1>
            {
            choice === ""
            ? <Buttons callback={pickChoice}/>
            : <Outcome choice={choice} winner={winner} socketID={socketID} restart={restart} />
            }
        </div>
    )
}

export default Game;