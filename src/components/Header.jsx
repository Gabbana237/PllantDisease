import React, { useState, useContext } from "react";
import { ChevronDown, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthContext"; // adapte le chemin si besoin

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="relative z-50 shadow-lg"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <div
                style={{ backgroundColor: "#FACC15" }}
                className="rounded-full p-2 shrink-0"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#059669" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </Link>
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
                  backgroundColor: "#FACC15",
                  color: "#059669",
                  fontWeight: "bold",
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Nos fiches
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.5rem",
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
                      style={{ color: "#0f172a" }}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {["Qui sommes-nous ?", "Vidéos", "Contactez nous ?"].map(
              (link) => {
                const linkMap = {
                  "Qui sommes-nous ?": "/about",
                  "Vidéos": "/videos",
                  "Contactez nous ?": "/contact",
                };

                return (
                  <Link
                    key={link}
                    to={linkMap[link]}
                    style={{ color: "green" }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {link}
                  </Link>
                );
              }
            )}
          </nav>

          {/* Zone actions (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/detection"
              style={{
                backgroundColor: "#FACC15",
                color: "#059669",
                fontWeight: "bold",
              }}
              className="px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Diagnostic
            </Link>

            {/* Icône utilisateur avec dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                style={{
                  backgroundColor: "#FACC15",
                  color: "#059669",
                }}
                className="p-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <User className="w-5 h-5" />
             
              </button>

              {isUserDropdownOpen && (
                <div
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                  className="absolute right-0 mt-2 w-56 border py-2 z-50"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-gray-700 border-b">
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span
                        onClick={handleLogout}
                        className="block px-4 py-2 text-left text-red-600 cursor-pointer hover:bg-emerald-50 hover:text-red-700 transition-colors select-none"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLogout(); }}
                      >
                        Déconnexion
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Burger menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: "#FACC15",
              color: "#059669",
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
              borderTop: "1px solid rgba(255,255,250,0.2)",
              paddingTop: "1rem",
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
              "dashboard",
            ].map((item) => {
              const linkMap = {
                "Nos fiches": "/fiches",
                "Vidéos": "/videos",
                "Qui sommes-nous ?": "/about",
                Diagnostic: "/detection",
                Login: "/login",
                Register: "/register",
                dashboard: "/dashboard",
              };

              const linkTo = linkMap[item] || "#";

              return (
                <Link
                  key={item}
                  to={linkTo}
                  style={{ color: "green" }}
                  className="block py-2 px-2 hover:text-yellow-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
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
          style={{ backgroundColor: "transparent" }}
        />
      )}

      {/* Overlay pour fermer le dropdown fiches */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
          style={{ backgroundColor: "transparent" }}
        />
      )}
    </header>
  );
};

export default Header;
