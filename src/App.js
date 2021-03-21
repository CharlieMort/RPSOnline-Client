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
      console.log(data);
      setRoomCode(data);
    });
    socket.on("socketInfo", (data) => {
      console.log(data);
      setSocketID(data);
    })
  }, []);

  console.log(user);

  return (
    <Router>
      <div className="App">
        <h1>RPS Online</h1>
        <h1>Logged In As: {user.username}</h1>
        <div>
          <Leaderboard />
        </div>
        <Switch>
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
      </div>
    </Router>
  );
}

export default App;
