import React, { useState, useRef, useEffect } from "react";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Références pour les inputs
  const inputRefs = useRef([]);
  
  // Email passé en props ou stocké (vous pouvez l'adapter selon votre logique)
  const email = "user@example.com"; // À remplacer par l'email réel

  // Timer pour le renvoi
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Empêche plus d'un caractère
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Passer au champ suivant si on tape un chiffre
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Retour en arrière
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Permettre seulement les chiffres
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    if (paste.length === 6 && /^\d{6}$/.test(paste)) {
      const newCode = paste.split('');
      setCode(newCode);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setErrorMsg("Veuillez entrer un code à 6 chiffres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pourrez remplacer par votre appel API réel
      // const response = await axios.post("http://172.20.10.2:8000/api/verify-email", {
      //   email,
      //   code: verificationCode,
      // });
      
      setSuccessMsg("Email vérifié avec succès ! Redirection en cours...");
      
      // Redirection après succès
      setTimeout(() => {
        // navigate("/dashboard"); // Décommentez pour la vraie navigation
        console.log("Redirection vers le dashboard");
      }, 2000);
      
    } catch (error) {
      setErrorMsg("Code de vérification incorrect. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setErrorMsg("");
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pourrez remplacer par votre appel API réel
      // const response = await axios.post("http://172.20.10.2:8000/api/resend-verification", {
      //   email,
      // });
      
      setSuccessMsg("Un nouveau code a été envoyé à votre email.");
      setTimer(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      
    } catch (error) {
      setErrorMsg("Erreur lors du renvoi du code. Veuillez réessayer.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">La Clinique Des Plantes</h1>
        <p className="text-sm text-emerald-600 mt-1">Vérifiez votre adresse email</p>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Nous avons envoyé un code de vérification à 6 chiffres à :
          </p>
          <p className="text-sm font-semibold text-emerald-700">{email}</p>
        </div>

        {/* Code inputs */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Code de vérification
          </label>
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-black"
                placeholder="0"
              />
            ))}
          </div>
        </div>

        {/* Message d'erreur */}
        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Message de succès */}
        {successMsg && (
          <p className="text-green-600 text-sm mb-4 text-center">{successMsg}</p>
        )}

        {/* Bouton vérifier */}
        <button
          onClick={handleSubmit}
          disabled={loading || code.join('').length !== 6}
          style={{ backgroundColor: '#FACC15' }}
          className="w-full py-3 px-4 text-emerald-800 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50 mb-4"
        >
          {loading ? 'Vérification...' : 'Vérifier le code'}
        </button>

        {/* Renvoi du code */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600">
              Renvoyer le code dans {timer} secondes
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              disabled={resendLoading}
              className="text-sm text-yellow-500 hover:text-yellow-600 disabled:opacity-50"
            >
              {resendLoading ? 'Envoi...' : 'Renvoyer le code'}
            </button>
          )}
        </div>
      </div>

      {/* Liens supplémentaires */}
      <div className="mt-6 text-center w-full max-w-md text-sm px-4">
        <a href="/login" className="text-yellow-500 hover:text-yellow-600">
          Retour à la connexion
        </a>
        <p className="mt-3">
          Problème avec la vérification ?{' '}
          <a href="/support" className="text-yellow-500 hover:text-yellow-600">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;