import LogoAuth from "../../components/Auth/LogoAuth";
import Signup from "../../components/Auth/Signup";
import "./auth.css";

const Auth = () => {
  return (
    <section className="auth">
      <LogoAuth />
      <Signup />
    </section>
  );
};

export default Auth;