import Login from "../../components/Auth/Login";
import LogoAuth from "../../components/Auth/LogoAuth";
import "./auth.css";

const Auth = () => {
  return (
    <section className="auth">
      <LogoAuth />
      <Login />
    </section>
  );
};

export default Auth;
