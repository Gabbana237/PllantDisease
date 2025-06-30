import React, { useState } from "react";
import { ChevronDown, Menu, X, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <header
      className="relative z-50 shadow-lg"
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Pour Safari
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        {/* Barre principale */}
        <div className="flex items-center justify-between">
          {/* Logo + titre */}
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: '#FACC15' }} className="rounded-full p-2 shrink-0">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: '#059669' }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Plants</h1>
              <p className="text-sm opacity-90 -mt-1">Disease</p>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Dropdown Fiches */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  backgroundColor: '#FACC15',
                  color: '#059669',
                  fontWeight: 'bold'
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Nos fiches
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Menu déroulant Fiches */}
              {isDropdownOpen && (
                <div
                  style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.5rem'
                  }}
                  className="absolute top-full left-0 mt-2 w-64 border py-2 z-50"
                >
                  {[
                    "Maladies courantes",
                    "Parasites",
                    "Carences nutritionnelles",
                    "Soins préventifs",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#"
                      style={{ color: '#0f172a' }}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

           {["Qui sommes-nous ?", "Vidéos", "Contactez nous ?"].map((link) => {
  // Mapping des liens vers les bonnes routes
  const linkMap = {
    "Qui sommes-nous ?": "/about",
    "Vidéos": "/videos",
    "Contactez nous ?": "/contact"
  };

  return (
    <a
      key={link}
      href={linkMap[link]}
      style={{ color: 'green' }}
      className="hover:text-yellow-300 transition-colors"
    >
      {link}
    </a>
  );
})}
          </nav>

          {/* Zone actions (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
    href="/detection"
    style={{
      backgroundColor: '#FACC15',
      color: '#059669',
      fontWeight: 'bold'
    }}
    className="px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
  >
    Diagnostic
  </a>

            {/* Icône utilisateur avec dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                style={{
                  backgroundColor: '#FACC15',
                  color: '#059669'
                }}
                className="p-2 rounded-full hover:opacity-90 transition-opacity flex items-center"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Menu déroulant Utilisateur */}
              {isUserDropdownOpen && (
                <div
                  style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.5rem'
                  }}
                  className="absolute right-0 mt-2 w-40 border py-2 z-50"
                >
                  <a
                    href="/login"
                    style={{ color: '#0f172a' }}
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    style={{ color: '#0f172a' }}
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Register
                  </a>
                   <a
                    href="/dashboard"
                    style={{ color: '#0f172a' }}
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Dashboard
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Burger menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: '#FACC15',
              color: '#059669'
            }}
            className="md:hidden p-2 rounded-full hover:opacity-90 transition-opacity"
            aria-label="Ouvrir le menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu mobile étendu */}
      {isMenuOpen && (
  <nav
    style={{
      borderTop: '1px solid rgba(255,255,250,0.2)',
      paddingTop: '1rem'
    }}
    className="md:hidden mt-4 pb-3 space-y-2"
  >
    {[
      "Nos fiches",
      "Vidéos",
      "Qui sommes-nous ?",
      "Diagnostic",
      "Login",
      "Register",
      "dashboard"
    ].map((item) => {
      // Mapping des liens
      const linkMap = {
        "Nos fiches": "/fiches",
        "Vidéos": "/videos",
        "Qui sommes-nous ?": "/about",
        "Diagnostic": "/detection",
        "Login": "/login",
        "Register": "/register",
        "dashboard":"/dashboard"
      };

      const linkTo = linkMap[item] || "#";

      return (
        <a
          key={item}
          href={linkTo}
          style={{ color: 'green' }}
          className="block py-2 px-2 hover:text-yellow-300 transition-colors"
        >
          {item}
        </a>
      );
    })}
  </nav>
)}
      </div>

      {/* Overlay pour fermer le dropdown utilisateur */}
      {isUserDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserDropdownOpen(false)}
          style={{ backgroundColor: 'transparent' }}
        />
      )}

      {/* Overlay pour fermer le dropdown fiches */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
          style={{ backgroundColor: 'transparent' }}
        />
      )}
    </header>
  );
};

export default Header;