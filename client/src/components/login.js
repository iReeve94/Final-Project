import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";




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
    <div className="login-container">
      <div className="login-center">
        <div className="login-form-container">
          <h1>Login Form</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              className="login-input"
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label id="loglabel" htmlFor="password">Password</label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="loginBtn" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;