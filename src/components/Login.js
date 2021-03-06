import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

const Login = ({setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [signedUp, setSignedUp] = useState(false);

    function SignUp(e) {
        e.preventDefault();

        const newUser = {
            username,
            password
        };

        axios.post("/api/users/add", newUser)
            .then(res => {
                setSignedUp(true);
            })
            .catch((err) => setError(err));
    }

    function SignIn() {
        const user = {
            username,
            password
        }

        axios.post("/api/users/login", user)
            .then(res => {
                setUser(res.data);
                setLoggedIn(true);
            })
            .catch(err => console.log(err));
    }

    if (loggedIn) {
        return <Redirect to="/" />
    }

    return(
        <div>
            {error ? <h4>Looks Like Someone Already Has That Username :( Try Again</h4>
            : null
            }
            <form>
                <input type="text" placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                { !signedUp &&
                    <input type="button" value="Sign Up" onClick={SignUp} />
                }
                <input type="button" value="Sign In" onClick={SignIn} />
            </form>
        </div>
    )
}

export default Login;