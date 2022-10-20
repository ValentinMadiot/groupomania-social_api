import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logos/logo-black.svg";
import { useSignup } from "../../hooks/useSignup";
import "./signup.css";

const Signup = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // const [confirmpass, setConfirmpass] = useState("");
  //   const [inputFiel, setInputField] = useState({
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     password: "",
  //   });
  //   const inputHandler = (e) => {
  //     setInputField({ [e.target.name]: e.target.value });
  //   };
  //     alert(inputFiel.firstname);
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password !== confPassword) {
    //   return alert('Les mots de passe ne correspondent pas')
    // }
    // console.log("Signup", email, password, firstname, lastname);
    await signup(email, password, firstname, lastname);
  };
  return (
    <section className="auth">
      <div className="authLogo">
        <img src={Logo} alt="" />
        <h2>Faites rager vos collègues avec vos photos de vacances</h2>
      </div>
      <div>
        <form className="authForm" onSubmit={handleSubmit}>
          <h3>Inscription</h3>
          <div className="grid">
            <input
              aria-label="Prénom"
              placeholder="Prénom"
              className="authFormInput"
              name="firstname"
              type="text"
              onChange={(e) => setFirstname(e.target.value)} // onChange={inputHandler}
              value={firstname} // value={inputFiel.firstname}
            />
            <input
              aria-label="Nom"
              placeholder="Nom"
              className="authFormInput"
              name="lastname"
              type="text"
              onChange={(e) => setLastname(e.target.value)} // onChange={inputHandler}
              value={lastname} // value={inputFiel.lastname}
            />
          </div>
          <input
            aria-label="Adresse e-mail"
            placeholder="Adresse e-mail"
            className="authFormInput"
            name="username"
            type="email"
            onChange={(e) => setEmail(e.target.value)} // onChange={inputHandler}
            value={email} // value={inputFiel.email}
          />
          <div className="grid">
            <input
              aria-label="Mot de passe"
              placeholder="Mot de passe"
              className="authFormInput"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)} // onChange={inputHandler}
              value={password} // value={inputFiel.password}
            />
            <input
              aria-label="Confirmation Mot de passe"
              placeholder="Confirmation Mot de passe"
              className="authFormInput"
              name="confirmpassword"
              type="password"
              onChange={(e) => setConfPassword(e.target.value)} // onChange={inputHandler}
              value={confPassword} // value={inputFiel.password}
            // pattern={password}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button disabled={isLoading} className="button authFormButton">
            Inscription
          </button>
          <div>
            <button className="authFormText">
              {/* onClick={() => props.onFormSwitch("login")} */}
              <Link to="/login">Déjà un compte? Connextez-vous !</Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
