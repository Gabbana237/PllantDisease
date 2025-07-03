import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pourrez remplacer par votre appel API réel
      // const response = await axios.post("http://172.20.10.2:8000/api/forgot-password", {
      //   email,
      // });
      
      setSuccessMsg("Un lien de réinitialisation a été envoyé à votre adresse email.");
      setEmail(""); // Reset form
    } catch (error) {
      setErrorMsg("Erreur réseau ou serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">La Clinique Des Plantes</h1>
        <p className="text-sm text-emerald-600 mt-1">Réinitialisez votre mot de passe</p>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Entrez votre adresse email pour recevoir un code de réinitialisation de mot de passe.
          </p>
        </div>

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

        {/* Message d'erreur */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Message de succès */}
        {successMsg && (
          <p className="text-green-600 text-sm mb-4 text-center">{successMsg}</p>
        )}

        {/* Bouton submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ backgroundColor: '#FACC15' }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
        </button>
      </div>

      {/* Liens supplémentaires */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
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

export default ForgotPassword;
