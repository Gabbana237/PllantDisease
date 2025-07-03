import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("http://172.20.10.2:8000/api/login", {
        email,
        password,
      });
      console.log("Réponse API login:", response.data);

      const token = response.data.token;
      if (token) {
        console.log("Token:", token);
        const user = response.data.user;
        login(token, user); // stocke token et user dans contexte
        navigate("/dashboard");
      } else {
        setErrorMsg("Connexion impossible : token manquant.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Erreur réseau ou serveur"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">La Clinique Des Plantes</h1>
        <p className="text-sm text-emerald-600 mt-1">Connectez-vous pour accéder à vos diagnostics</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="Votre adresse email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="Votre mot de passe"
          />
        </div>

        {/* Message d'erreur */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Bouton submit */}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: '#FACC15' }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Liens supplémentaires */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/forgot-password" className="text-yellow-500 hover:text-yellow-600">
          Mot de passe oublié ?
        </a>
        <p className="mt-3">
          Pas encore inscrit ?{' '}
          <a href="/register" className="text-yellow-500 hover:text-yellow-600">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
