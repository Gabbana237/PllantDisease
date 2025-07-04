import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // email récupéré du localStorage (défini à l’étape précédente)
  const email = localStorage.getItem("reset_email") || "user@example.com";

  /* ----- Countdown pour renvoi du code ----- */
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  /* ----- Gestion des inputs (1 chiffre par case) ----- */
  const handleInputChange = (i, val) => {
    if (val.length > 1) return;
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    if (val && i < 5) inputRefs.current[i + 1].focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1].focus();
    }
    if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "Tab"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (/^\\d{6}$/.test(paste)) {
      setCode(paste.split(""));
      inputRefs.current[5].focus();
    }
  };

  /* ----- Vérifier le code ----- */
  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setErrorMsg("Veuillez entrer un code à 6 chiffres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post("http://172.20.10.2:8000/api/password/verify", {
        email,
        code: verificationCode,
      });
      localStorage.setItem("resetEmail", email);
      setSuccessMsg("Email vérifié avec succès ! Redirection en cours...");
      setTimeout(() => navigate("/reset", { state: { email } }), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Code de vérification incorrect. Veuillez réessayer.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ----- Renvoyer le code ----- */
  const handleResendCode = async () => {
    setResendLoading(true);
    setErrorMsg("");
    try {
      await axios.post("http://172.20.10.2:8000/api/resend-verification", {
        email,
      });
      setSuccessMsg("Un nouveau code a été envoyé à votre email.");
      setTimer(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
        "Erreur lors du renvoi du code. Veuillez réessayer."
      );
    } finally {
      setResendLoading(false);
    }
  };

  /* ============ UI ============ */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Titre */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
          La Clinique Des Plantes
        </h1>
        <p className="text-sm text-emerald-600 mt-1">
          Vérifiez votre adresse email
        </p>
      </div>

      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        <p className="text-sm text-gray-600 text-center mb-2">
          Nous avons envoyé un code à :
        </p>
        <p className="text-sm font-semibold text-emerald-700 text-center mb-6">
          {email}
        </p>

        {/* Inputs code */}
        <div className="flex gap-2 justify-center mb-6">
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength="1"
              value={d}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
            />
          ))}
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

        {/* Bouton vérifier */}
        <button
          onClick={handleSubmit}
          disabled={loading || code.join("").length !== 6}
          style={{ backgroundColor: "#FACC15" }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50 mb-4"
        >
          {loading ? "Vérification..." : "Vérifier le code"}
        </button>

        {/* Renvoi du code */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600">
              Renvoyer le code dans {timer} s
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              disabled={resendLoading}
              className="text-sm text-yellow-500 hover:text-yellow-600 disabled:opacity-50"
            >
              {resendLoading ? "Envoi..." : "Renvoyer le code"}
            </button>
          )}
        </div>
      </div>

      {/* liens */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
        </a>
        <p className="mt-3">
          Problème ?{" "}
          <a href="/support" className="text-yellow-500 hover:text-yellow-600">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
