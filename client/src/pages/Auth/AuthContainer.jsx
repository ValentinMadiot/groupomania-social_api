import { useLocation } from "react-router-dom";
import LogoAuth from "../../components/Auth/LogoAuth";
import "./../../pages/Auth/auth.css";
import Login from "./Login";
import Signup from "./Signup";

const AuthContainer = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="authWrapper">
      <LogoAuth />
      <div className={`flip-card ${isLogin ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Signup />
          </div>
          <div className="flip-card-back">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
