import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Appel réel vers l'API Laravel
      const res = await axios.post(
        "http://172.20.10.2:8000/api/password/forgot",
        { email }
      );

      // Rediriger vers la page du code de vérification
      // On peut stocker l'email pour l'utiliser sur la page suivante (via state ou localStorage)
      localStorage.setItem("reset_email", email);
      navigate("/email-verification");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Erreur réseau ou serveur";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
          La Clinique Des Plantes
        </h1>
        <p className="text-sm text-emerald-600 mt-1">
          Réinitialisez votre mot de passe
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg"
      >
        <p className="text-sm text-gray-600 text-center mb-6">
          Entrez votre adresse email pour recevoir un code de réinitialisation.
        </p>

        {/* Champ Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="ex: exemple@email.com"
          />
        </div>

        {/* Message d'erreur */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#FACC15" }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : "Envoyer le code"}
        </button>
      </form>

      {/* Liens utiles */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
        </a>
        <p className="mt-3">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-yellow-500 hover:text-yellow-600">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
