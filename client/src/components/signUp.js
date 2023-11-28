import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './signUp.css';


function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
async function handleRegister(e) {
    e.preventDefault();
    let res = await axios.post("http://localhost:8000/register", {email, password});
    alert(res.data.msg)
    navigate("/login")
}

return (
    <div className="sign-container">
        <div className="signUpn-center">
        <div className="signUp-form-container">
        <h1>Sign Up</h1>
        <form className="signUpForm" onSubmit={handleRegister}>
            <label htmlFor="userEmail">Email</label>
            <input
                className="signUp-input"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label  id="loglabel" htmlFor="password">Password</label>
            <input 
                className="signUp-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signUpBtn" type="submit">Sign up</button>
        </form>
        </div>
        </div>
    </div>
)
};

export default SignUp;