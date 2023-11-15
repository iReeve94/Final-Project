import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()


async function handleLogin(e) {
    try {
        e.preventDefault();
        let res = await axios.post("http://localhost:8000/login", { email, password});
        if (res.status === 200) {
            alert(res.data.msg);
            localStorage.setItem("token", res.data.token);
           navigate("/")
        }
    } catch (error) {
        alert("Can't login, please check your email or password")
    }
}


return (
    <div className="login">
        <h1>Login Form</h1>
        <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                id="pass"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log in</button>
        </form>
    </div>
)
}

export default Login;