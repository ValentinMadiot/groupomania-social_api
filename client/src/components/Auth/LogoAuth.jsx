import Logo from "../../assets/logos/logo-white.svg";

const LogoAuth = () => {
  return (
    <div className="authLogo">
      <img src={Logo} alt="Groupomania logo" />
      <h2>Vos films d’enfance à partager entre collègues</h2>
    </div>
  );
};

export default LogoAuth;
