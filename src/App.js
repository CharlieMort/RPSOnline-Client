import "bootswatch/dist/cyborg/bootstrap.min.css";
import './App.css';
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import JoinOrCreate from "./components/joinorcreate";
import Game from "./components/Game";
import Login from './components/Login';
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [roomCode, setRoomCode] = useState("");
  const [socketID, setSocketID] = useState("");
  const [user, setUser] = useState({});

  const updateUser = (userObj) => {
    setUser({...userObj});
  }

  useEffect(() => {
    socket.on("room_join", (data) => {
      setRoomCode(data);
    });
    socket.on("socketInfo", (data) => {
      setSocketID(data);
    })
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="top-bar">
          <h1>RPS Online</h1>
          <h4>
            { user.username
            ? user.username
            : "Not Logged In"
            }
          </h4>
        </div>
        <div className="Main-Row">
          <Leaderboard className="leaderboard"/>
          <Switch className="Game">
            <Route path="/" exact>
              <Home user={user} />
            </Route>
            <Route path="/game" exact>
              <JoinOrCreate socket={socket} roomCode={roomCode}/>
            </Route>
            <Route path="/login" exact>
              <Login setUser={updateUser}/>
            </Route>
            <Route path="/game/:id">
              <Game socket={socket} roomCode={roomCode} socketID={socketID} user={user} />
            </Route>
          </Switch>
          <div className="empty"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
