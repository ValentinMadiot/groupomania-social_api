import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logos/logo-black.svg";
// import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";
import "../signup/signup.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, setError } = useLogin();
  console.log("setError",setError);
  console.log("error",error);
  // let navigate = useNavigate();
  // const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    // if (!login) {
    //   setError("Votre email ou mot de passe est incorrect");
    //   return;
    // }
    // // if (isLoading) {
    // navigate("/");
    // } else;
    // return;
  };

  return (
    <section className="auth">
      <div className="authLogo">
        <img src={Logo} alt="" />
        <h2>Faites rager vos collègues avec vos photos de vacances</h2>
      </div>
      <div>
        <form className="authForm" onSubmit={handleSubmit}>
          <h3>Connexion</h3>
          <input
            aria-label="Adresse e-mail"
            placeholder="Adresse e-mail"
            className="authFormInput"
            name="username"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            aria-label="Mot de passe"
            className="authFormInput"
            placeholder="Mot de passe"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* <Link to="/"> */}
          {error && <div className="errorLogin">{error}</div>}
          <button disabled={isLoading} className="button authFormButton" type="submit">
            {/* type="submit" */}
            Connexion
          </button>
          <div>
            <button
              className="authFormText"
              // onClick={() => props.onFormSwitch("signup")}
            >
              <Link to="/signup">
                Vous n'avez pas de compte? Inscrivez-vous!
              </Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
