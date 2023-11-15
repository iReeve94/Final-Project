import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    <div className="sign-form">
        <h1>Sign Up</h1>
        <form className="signUpForm" onSubmit={handleRegister}>
            <label htmlFor="userEmail">Email</label>
            <input
                id="userEmail"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign up</button>
        </form>
    </div>
)
};

export default SignUp;