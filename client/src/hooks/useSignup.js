import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  let navigate = useNavigate();

  const signup = async (email, password, firstname, lastname) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(
          json.error ||
            "Une erreur inconnue est survenue lors de l'inscription."
        );
        setIsLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
