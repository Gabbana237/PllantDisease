import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
  /* ---------------------- states ---------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /* --------- récupérer l'email depuis localStorage -------- */
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setErrorMsg(
        "E-mail manquant. Veuillez refaire la procédure de réinitialisation."
      );
    }
  }, []);

  /* ----------------- helpers validation ------------------ */
  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /\W/.test(pwd);
    if (pwd.length < minLength) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!hasUpper) return "Le mot de passe doit contenir au moins une majuscule.";
    if (!hasLower) return "Le mot de passe doit contenir au moins une minuscule.";
    if (!hasDigit) return "Le mot de passe doit contenir au moins un chiffre.";
    if (!hasSpecial) return "Le mot de passe doit contenir au moins un caractère spécial.";
    return null;
  };

  const getPasswordStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/\W/.test(pwd)) s++;
    return s;
  };
  const strength = getPasswordStrength(password);
  const strengthColor =
    strength < 2 ? "bg-red-500" : strength < 4 ? "bg-yellow-500" : "bg-green-500";
  const strengthText = strength < 2 ? "Faible" : strength < 4 ? "Moyen" : "Fort";

  /* ------------------ submit handler ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // validation
    const err = validatePassword(password);
    if (err) return setErrorMsg(err);
    if (password !== confirmPassword)
      return setErrorMsg("Les mots de passe ne correspondent pas.");
    if (!email) return setErrorMsg("Email non disponible.");

    setLoading(true);
    try {
      await axios.post("http://172.20.10.2:8000/api/password/reset", {
        email,
        password,
        password_confirmation: confirmPassword,
      });
      setSuccessMsg("Mot de passe réinitialisé avec succès ! Redirection...");
      // Nettoyer
      localStorage.removeItem("resetEmail");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
        "Erreur lors de la réinitialisation. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------- UI ------------------------ */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
          La Clinique Des Plantes
        </h1>
        <p className="text-sm text-emerald-600 mt-1">
          Créez un nouveau mot de passe
        </p>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Choisissez un mot de passe pour&nbsp;
            <strong>{email || "(email non disponible)"}</strong>
          </p>
        </div>

        {/* Nouveau mot de passe */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              placeholder="Entrez votre mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${i < strength ? strengthColor : "bg-gray-200"
                      }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs ${strength < 2
                    ? "text-red-500"
                    : strength < 4
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
              >
                Force : {strengthText}
              </p>
            </div>
          )}
        </div>

        {/* Confirmation */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              placeholder="Confirmez le mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {confirmPassword && (
            <p
              className={`text-xs mt-1 ${password === confirmPassword ? "text-green-500" : "text-red-500"
                }`}
            >
              {password === confirmPassword
                ? "✓ Les mots de passe correspondent"
                : "✗ Les mots de passe ne correspondent pas"}
            </p>
          )}
        </div>

        {/* Critères */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-medium text-gray-700 mb-2">
            Le mot de passe doit contenir :
          </p>
          <ul className="space-y-1">
            <li className={password.length >= 8 ? "text-green-600" : ""}>
              • Au moins 8 caractères
            </li>
            <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
              • Une majuscule
            </li>
            <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>
              • Une minuscule
            </li>
            <li className={/\d/.test(password) ? "text-green-600" : ""}>
              • Un chiffre
            </li>
            <li className={/\W/.test(password) ? "text-green-600" : ""}>
              • Un caractère spécial
            </li>
          </ul>
        </div>

        {/* Messages */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mb-4 text-center">
            {successMsg}
          </p>
        )}

        {/* Bouton */}
        <button
          onClick={handleSubmit}  style={{ backgroundColor: "#FACC15" }}
          disabled={
            loading ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            !email
          }
        
          className="w-full py-3 font-semibold rounded-lg hover:bg-yellow-300 disabled:opacity-50 text-emerald-800"
        >
          {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
        </button>
      </div>

      <div className="mt-6 text-sm text-center max-w-md">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
