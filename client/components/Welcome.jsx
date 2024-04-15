import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
      return;
    }
  }, []);

  return (
    <div className="welcome">
      <img src="../images/logo.png" alt="logo" className="logo" />
      <p className="wel-title">Organize Your Day, the Effortless Way!</p>
      <button
        className="wel-button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Continue
      </button>
    </div>
  );
}
