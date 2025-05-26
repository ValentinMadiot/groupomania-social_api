import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="authForm login" onSubmit={handleLogin}>
      <h3>Connexion</h3>
      <input
        required
        aria-label="Adresse e-mail"
        placeholder="Adresse e-mail"
        className="authFormInput"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        required
        aria-label="Mot de passe"
        placeholder="Mot de passe"
        className="authFormInput"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <div className="errorAuth">{error}</div>}
      <button
        disabled={isLoading}
        className="button authFormButton"
        type="submit">
        Connexion
      </button>
      <div>
        <button className="authFormText">
          <Link to="/signup">Vous n'avez pas de compte? Inscrivez-vous!</Link>
        </button>
      </div>
    </form>
  );
};

export default Login;
