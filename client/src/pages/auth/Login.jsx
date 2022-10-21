import LogoAuth from "../../components/Auth/LogoAuth";
import Login from "../../components/Auth/Login";
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