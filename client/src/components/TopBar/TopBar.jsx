import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

import { signOut } from "../../assets/icons";
import Logo from "../../assets/logos/logo-white.svg";
import "./topbar.css";

const TopBar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const handleScoll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="topBar">
      <div>
        <img
          className="topBarLogo"
          src={Logo}
          alt="logo Groupomania"
          onClick={handleScoll}
        />
        <Link to="/login">
          <img
            className="topBarLogout"
            src={signOut}
            alt="Déconnexion"
            onClick={handleLogout}
          />
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
