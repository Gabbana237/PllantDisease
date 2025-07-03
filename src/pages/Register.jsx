import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // icône de chargement animée

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await axios.post('http://172.20.10.2:8000/api/register', {
        username,
        email,
        password,
      });

      setFeedback({
        type: 'success',
        message: response.data.message || "Compte créé avec succès !",
      });

      // Réinitialisation des champs
      setUsername('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/');
        window.location.reload(); // À utiliser temporairement pour le debug
      }, 1500);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de l'inscription. Veuillez réessayer.";
      setFeedback({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">La Clinique Des Plantes</h1>
        <p className="text-sm text-emerald-600 mt-1">Créez votre compte pour démarrer</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg"
      >
        {feedback && (
          <div
            className={`mb-4 p-4 rounded-lg text-sm ${feedback.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Username */}
        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Nom d'utilisateur
          </label>
          {/* Username */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="Votre nom d'utilisateur"
            required
          />

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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="Votre adresse email"
            required
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
            placeholder="Votre mot de passe"
            required
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: '#FACC15' }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" /> Création...
            </>
          ) : (
            'Créer un compte'
          )}
        </button>
      </form>

      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <p>
          Déjà inscrit ?{' '}
          <a href="/login" className="text-yellow-500 hover:text-yellow-600">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
