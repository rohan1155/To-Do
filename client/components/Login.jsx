import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
      return;
    }
  }, []);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data
      );
      // console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.log("Error:", errorMessage);
      toast.error(errorMessage);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <div className="login">
      <p className="login-text">Login to your Account</p>
      <TextField
        label="Username"
        variant="outlined"
        type="username"
        value={data.username}
        onChange={(e) => {
          setData({ ...data, username: e.target.value });
        }}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={data.password}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
        onKeyDown={handleKeyDown}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p>
        Dont have an Account ?
        <a
          href=""
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </a>
      </p>
      <ToastContainer />
    </div>
  );
}
