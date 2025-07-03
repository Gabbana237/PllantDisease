import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Token de réinitialisation (normalement récupéré depuis l'URL)
  const resetToken = "dummy-reset-token"; // À remplacer par le vrai token

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    if (password.length < minLength) {
      return "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!hasUpperCase) {
      return "Le mot de passe doit contenir au moins une majuscule.";
    }
    if (!hasLowerCase) {
      return "Le mot de passe doit contenir au moins une minuscule.";
    }
    if (!hasNumbers) {
      return "Le mot de passe doit contenir au moins un chiffre.";
    }
    if (!hasNonalphas) {
      return "Le mot de passe doit contenir au moins un caractère spécial.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validation du mot de passe
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMsg(passwordError);
      return;
    }

    // Vérification de la confirmation
    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pourrez remplacer par votre appel API réel
      // const response = await axios.post("http://172.20.10.2:8000/api/reset-password", {
      //   token: resetToken,
      //   password,
      //   password_confirmation: confirmPassword,
      // });
      
      setSuccessMsg("Mot de passe réinitialisé avec succès ! Redirection vers la connexion...");
      
      // Redirection après succès
      setTimeout(() => {
        // navigate("/login"); // Décommentez pour la vraie navigation
        console.log("Redirection vers la page de connexion");
      }, 2000);
      
    } catch (error) {
      setErrorMsg("Erreur lors de la réinitialisation. Le lien a peut-être expiré.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/\W/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength < 2) return "Faible";
    if (strength < 4) return "Moyen";
    return "Fort";
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">La Clinique Des Plantes</h1>
        <p className="text-sm text-emerald-600 mt-1">Créez un nouveau mot de passe</p>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Choisissez un nouveau mot de passe sécurisé pour votre compte.
          </p>
        </div>

        {/* Nouveau mot de passe */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
              placeholder="Entrez votre nouveau mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Indicateur de force du mot de passe */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${
                      i < passwordStrength ? getStrengthColor(passwordStrength) : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${
                passwordStrength < 2 ? "text-red-500" : 
                passwordStrength < 4 ? "text-yellow-500" : "text-green-500"
              }`}>
                Force : {getStrengthText(passwordStrength)}
              </p>
            </div>
          )}
        </div>

        {/* Confirmation du mot de passe */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
              placeholder="Confirmez votre nouveau mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Indicateur de correspondance */}
          {confirmPassword && (
            <p className={`text-xs mt-1 ${
              password === confirmPassword ? "text-green-500" : "text-red-500"
            }`}>
              {password === confirmPassword ? "✓ Les mots de passe correspondent" : "✗ Les mots de passe ne correspondent pas"}
            </p>
          )}
        </div>

        {/* Critères du mot de passe */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-2">Le mot de passe doit contenir :</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className={password.length >= 8 ? "text-green-600" : "text-gray-600"}>
              {password.length >= 8 ? "✓" : "•"} Au moins 8 caractères
            </li>
            <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-gray-600"}>
              {/[A-Z]/.test(password) ? "✓" : "•"} Une majuscule
            </li>
            <li className={/[a-z]/.test(password) ? "text-green-600" : "text-gray-600"}>
              {/[a-z]/.test(password) ? "✓" : "•"} Une minuscule
            </li>
            <li className={/\d/.test(password) ? "text-green-600" : "text-gray-600"}>
              {/\d/.test(password) ? "✓" : "•"} Un chiffre
            </li>
            <li className={/\W/.test(password) ? "text-green-600" : "text-gray-600"}>
              {/\W/.test(password) ? "✓" : "•"} Un caractère spécial
            </li>
          </ul>
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
          disabled={loading || !password || !confirmPassword || password !== confirmPassword}
          style={{ backgroundColor: '#FACC15' }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
        </button>
      </div>

      {/* Liens supplémentaires */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
        </a>
        <p className="mt-3">
          Besoin d'aide ?{' '}
          <a href="/support" className="text-yellow-500 hover:text-yellow-600">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;