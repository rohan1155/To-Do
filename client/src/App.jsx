import Welcome from "../components/Welcome";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
