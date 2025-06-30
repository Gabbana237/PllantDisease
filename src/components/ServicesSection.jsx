import React from 'react';
import { 
  Upload, 
  Image,
  Brain, 
  ClipboardList, 
  Leaf,
  CheckCircle2
} from 'lucide-react';

const ServicesSection = () => {
  return (
    <section className="py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%)`,
      }}
    >
      {/* Grande feuille décorative droite */}
      <div className="absolute top-0 right-0 w-96 h-full opacity-10">
        <svg viewBox="0 0 400 800" className="w-full h-full text-emerald-300">
          <path d="M350 100 Q380 200 350 300 Q320 400 350 500 Q380 600 350 700 Q300 750 250 700 Q200 650 250 600 Q300 550 250 500 Q200 450 250 400 Q300 350 250 300 Q200 250 250 200 Q300 150 350 100" 
                fill="currentColor" opacity="0.6"/>
          <path d="M320 150 Q340 220 320 290 Q300 360 320 430 Q340 500 320 570 Q280 600 240 570 Q200 540 240 510 Q280 480 240 450 Q200 420 240 390 Q280 360 240 330 Q200 300 240 270 Q280 240 320 150" 
                fill="currentColor" opacity="0.4"/>
        </svg>
      </div>

      {/* Éléments de feuilles flottantes */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20 animate-pulse">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-200">
          <path d="M50 10 Q70 25 60 40 Q50 55 40 40 Q30 25 50 10" fill="currentColor" opacity="0.8"/>
          <path d="M50 45 Q65 60 55 75 Q50 90 45 75 Q35 60 50 45" fill="currentColor" opacity="0.6"/>
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-20 w-24 h-24 opacity-15 animate-pulse delay-1000">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-200">
          <ellipse cx="50" cy="50" rx="35" ry="20" fill="currentColor" opacity="0.7"/>
          <ellipse cx="50" cy="50" rx="25" ry="35" fill="currentColor" opacity="0.5"/>
          <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.9"/>
        </svg>
      </div>

      {/* Particules flottantes */}
      <div className="absolute top-32 left-1/4 w-16 h-16 opacity-10 animate-pulse delay-500">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-100">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <circle cx="30" cy="30" r="4" fill="currentColor"/>
          <circle cx="70" cy="70" r="6" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute bottom-32 left-16 w-20 h-20 opacity-12 animate-pulse delay-2000">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-100">
          <path d="M50 20 Q60 30 50 40 Q40 30 50 20" fill="currentColor" opacity="0.8"/>
          <path d="M50 40 Q60 50 50 60 Q40 50 50 40" fill="currentColor" opacity="0.6"/>
          <path d="M50 60 Q60 70 50 80 Q40 70 50 60" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fadeInUp drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Comment ça fonctionne ?
          </h2>
          <p className="text-emerald-50 text-lg animate-fadeInUp drop-shadow-md" style={{ animationDelay: '0.4s' }}>
            Soumettez une photo de votre plante malade, notre IA détecte les symptômes et vous propose des solutions adaptées.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Étape 1 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp border border-emerald-100" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Image className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">1. Téléchargez une photo</h3>
            <p className="text-gray-600">
              Prenez ou téléchargez une photo claire de la plante malade que vous souhaitez analyser.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp border border-emerald-100" style={{ animationDelay: '0.7s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">2. Analyse intelligente</h3>
            <p className="text-gray-600">
              Notre intelligence artificielle analyse les symptômes visibles sur la photo soumise.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp border border-emerald-100" style={{ animationDelay: '0.9s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">3. Résultat & conseils</h3>
            <p className="text-gray-600">
              Recevez un diagnostic précis et des conseils simples pour soigner votre plante efficacement.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
          <a
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-800 px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#FACC15' }}
          >
            Commencer mon diagnostic maintenant
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;