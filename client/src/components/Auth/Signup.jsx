import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const [customError, setCustomError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setCustomError("Tous les champs doivent être remplis.");
      return;
    }
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail(email)) {
      setCustomError("L'adresse e-mail est invalide.");
      return;
    }

    // Validation basique du mot de passe
    const passwordIsValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);

    if (!passwordIsValid) {
      setCustomError(
        "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre."
      );
      return;
    }

    setCustomError("");
    await signup(email, password, firstname, lastname);
  };

  return (
    <div>
      <form className="authForm signup" onSubmit={handleSignup}>
        <h3>Inscription</h3>
        <div className="grid">
          <input
            aria-label="Prénom"
            placeholder="Prénom"
            className="authFormInput"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
          />
          <input
            aria-label="Nom"
            placeholder="Nom"
            className="authFormInput"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
          />
        </div>
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
        {(customError || error) && (
          <div className="errorAuth">{customError || error}</div>
        )}
        <button disabled={isLoading} className="button authFormButton">
          Inscription
        </button>
        <div>
          <p className="authFormText">
            <Link to="/login">Déjà un compte? Connectez-vous !</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
