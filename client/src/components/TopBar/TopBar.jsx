import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

import Logo from "../../assets/logos/logo-white.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import "./topbar.css";

const TopBar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="topBar">
      <Link to="/">
        <img className="topBarLogo" src={Logo} alt="logo Groupomania" />
      </Link>
      <Link to="/login">
        <UilSignOutAlt className="topBarLogout" onClick={handleClick}/>
      </Link>
    </header>
  );
};

export default TopBar;
