import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Liste des images en fond
  const images = [
    
    '/slider/plant1.jpg',
    '/slider/plant2.jpg',
    '/slider/plant3.jpg'
  ];

  // Changement automatique d'image toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const plantOptions = [
    { value: '', label: 'Choisissez une plante' },
    { value: 'rose', label: 'Rose' },
    { value: 'tomate', label: 'Tomate' },
    { value: 'orchidee', label: 'Orchidée' },
    { value: 'ficus', label: 'Ficus' },
    { value: 'basilic', label: 'Basilic' },
    { value: 'geranium', label: 'Géranium' },
    { value: 'monstera', label: 'Monstera' },
    { value: 'lavande', label: 'Lavande' },
    { value: 'autre', label: 'Autre plante' }
  ];

  const handleDiagnostic = () => {
    console.log('Démarrage du diagnostic pour:', selectedPlant);
    // Ici vous pourrez rediriger vers la page de diagnostic
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond avec carrousel */}
      <div className="absolute inset-0 z-0">
        {/* Carrousel d'images */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        {/* Overlay dégradé pour améliorer lisibilité */}
     {/* Overlay dégradé pour améliorer lisibilité */}
<div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-800/40 to-emerald-900/60"></div>
        {/* Éléments décoratifs SVG (optionnels) */}
        <div className="absolute top-10 left-5 w-16 h-16 sm:w-24 sm:h-24 opacity-20 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-800">
            <path d="M50 10 Q70 30 50 50 Q30 30 50 10" fill="currentColor" opacity="0.3"/>
            <path d="M50 50 Q70 70 50 90 Q30 70 50 50" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
        
        <div className="absolute top-20 right-4 w-12 h-12 sm:w-20 sm:h-20 opacity-15 animate-pulse delay-1000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-800">
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="currentColor" opacity="0.4"/>
            <ellipse cx="50" cy="50" rx="30" ry="40" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        
        <div className="absolute bottom-16 left-10 w-20 h-20 sm:w-32 sm:h-32 opacity-10 animate-pulse delay-2000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-800">
            <path d="M20 80 Q50 20 80 80 Q50 60 20 80" fill="currentColor" opacity="0.3"/>
            <circle cx="30" cy="70" r="3" fill="currentColor" opacity="0.6"/>
            <circle cx="70" cy="70" r="4" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        <div className="absolute bottom-8 right-16 w-16 h-16 sm:w-24 sm:h-24 opacity-20 animate-pulse delay-3000">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-800">
            <path d="M50 10 L70 30 L50 50 L30 30 Z" fill="currentColor" opacity="0.3"/>
            <path d="M50 50 L70 70 L50 90 L30 70 Z" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>

        {/* Grande feuille droite (visible sur desktop uniquement) */}
        <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-800">
            <path d="M100 20 Q160 60 140 120 Q120 160 100 180 Q80 160 60 120 Q40 60 100 20" fill="currentColor" opacity="0.4"/>
            <path d="M100 20 Q130 50 120 90 Q110 130 100 150 Q90 130 80 90 Q70 50 100 20" fill="currentColor" opacity="0.3"/>
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            <path d="M100 60 Q120 80 100 100" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
            <path d="M100 100 Q120 120 100 140" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Titre principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Bienvenue sur
            <br />
            <span className="text-yellow-300">La Clinique Des Plantes</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-12 leading-relaxed text-emerald-50 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4">
            Premier site gratuit de diagnostic pour les plantes ! En 4 clics, identifiez les maladies, 
            les insectes, les carences et obtenez des conseils simples et pratiques pour vous aider à les soigner.
          </p>

          {/* Interface de diagnostic */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-white/20">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              {/* Sélecteur de plante */}
              <div className="relative flex-1 w-full">
                <select 
                  value={selectedPlant}
                  onChange={(e) => setSelectedPlant(e.target.value)}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white text-gray-800 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 appearance-none cursor-pointer text-sm sm:text-lg font-medium"
                >
                  {plantOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>

              {/* Bouton de diagnostic */}
              <button 
                onClick={handleDiagnostic}
                className="bg-yellow-400 hover:bg-yellow-300 text-emerald-800 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2 whitespace-nowrap"
                style={{ backgroundColor: '#FACC15' }}
              >
                <span>Débuter le diagnostic</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1">15K+</div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-100">Diagnostics réalisés</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1">95%</div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-100">Précision</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-100">Espèces</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-1">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-100">Disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-50 delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-60 delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-80 delay-3000"></div>
      </div>
    </section>
  );
};

export default HeroSection;