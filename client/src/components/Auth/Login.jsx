import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const [customError, setCustomError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setCustomError("Veuillez remplir tous les champs.");
      return;
    }
    if (!email.includes("@")) {
      setCustomError("L'adresse e-mail est invalide.");
      return;
    }

    setCustomError("");
    await login(email, password);
  };

  return (
    <form className="authForm login" onSubmit={handleLogin}>
      <h3>Connexion</h3>
      <input
        aria-label="Adresse e-mail"
        placeholder="Adresse e-mail"
        className="authFormInput"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        aria-label="Mot de passe"
        placeholder="Mot de passe"
        className="authFormInput"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {(customError || error || "‎") && (
        <div className="errorAuth">{customError || error || "‎"}</div>
      )}
      <button
        disabled={isLoading}
        className="button authFormButton"
        type="submit">
        Connexion
      </button>
      <div>
        <p className="authFormText">
          <Link to="/signup">Inscription</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
