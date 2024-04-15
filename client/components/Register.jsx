import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
      return;
    }
  }, []);

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
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
      handleRegister(event);
    }
  };

  return (
    <div className="login">
      <p className="login-text">Create an Account</p>
      <TextField
        label="Name"
        variant="outlined"
        type="name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Username"
        variant="outlined"
        type="username"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <button className="login-button register-button" onClick={handleRegister}>
        Sign Up
      </button>
      <p>
        Already have an Account ?
        <a
          href=""
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </a>
      </p>
      <ToastContainer />
    </div>
  );
}
