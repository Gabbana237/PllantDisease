import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram,
  Leaf
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div style={{ backgroundColor: '#FACC15' }} className="bg-yellow-400 rounded-full p-2">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 style={{ color: '#059669' }} className="text-lg font-semibold">Plants</h3>
                <p style={{ color: '#059669' }} className="text-sm">Disease</p>
              </div>
            </div>
            <p style={{ color: '#059669' }} className="text-sm leading-relaxed">
              Premier site gratuit de diagnostic pour les plantes !
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <div className="space-y-2">
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Diagnostic
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Fiches plante
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Fiches diagnostic
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Fiches conseil
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Actualités
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <div className="space-y-2">
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Vidéos
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Contact
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-sm">
                Qui sommes-nous ?
              </a>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h4 style={{ color: '#059669' }} className="font-medium">Retrouvez-nous sur</h4>
            <div className="flex space-x-3">
              <a 
                href="#" 
                style={{ backgroundColor: '#059669', color: 'white' }}
                className="hover:bg-emerald-700 p-2 rounded-full transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                style={{ backgroundColor: '#059669', color: 'white' }}
                className="hover:bg-emerald-700 p-2 rounded-full transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                style={{ backgroundColor: '#059669', color: 'white' }}
                className="hover:bg-emerald-700 p-2 rounded-full transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            
            {/* Liens légaux */}
            <div className="space-y-2 pt-4">
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-xs">
                Mentions légales
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-xs">
                Plan du site
              </a>
              <a href="#" style={{ color: '#059669' }} className="block hover:text-emerald-600 transition-colors text-xs">
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p style={{ color: '#059669' }} className="text-center text-sm">
            Copyright©2025 . Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;