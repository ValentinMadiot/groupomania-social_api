import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstname, lastname);
  };

  return (
    <div>
      <form className="authForm signup" onSubmit={handleSubmit}>
        <h3>Inscription</h3>
        <div className="grid">
          <input
            required
            aria-label="Prénom"
            placeholder="Prénom"
            className="authFormInput"
            name="firstname"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
          />
          <input
            required
            aria-label="Nom"
            placeholder="Nom"
            className="authFormInput"
            name="lastname"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
          />
        </div>
        <input
          required
          aria-label="Adresse e-mail"
          placeholder="Adresse e-mail"
          className="authFormInput"
          name="username"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
        />
        <input
          required
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          className="authFormInput"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <div className="errorAuth">{error}</div>}
        <button disabled={isLoading} className="button authFormButton">
          Inscription
        </button>
        <div>
          <button className="authFormText">
            <Link to="/">Déjà un compte? Connextez-vous !</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;