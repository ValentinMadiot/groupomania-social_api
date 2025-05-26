import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  let navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Email ou mot de passe incorrect.");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/home");
      setIsLoading(false);
    } catch (err) {
      setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
