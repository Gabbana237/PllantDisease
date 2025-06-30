import React from 'react';
import { Brain, Cpu, Camera, TrendingUp, Users, Microscope, Shield, BarChart3 } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574263867128-b20b0a61b0b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Brain className="w-16 h-16 text-green-100" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-100 to-lime-200 bg-clip-text text-transparent">
              Intelligence Artificielle au Service de l'Agriculture
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed text-green-50">
              Nous développons des modèles d'IA avancés pour détecter précocement les maladies des plantes 
              et aider les agriculteurs à maximiser leurs rendements
            </p>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <Cpu className="w-5 h-5" />
              <span className="font-medium">Innovation technologique</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              Notre Modèle de Deep Learning
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Grâce aux dernières avancées en intelligence artificielle, notre modèle analyse 
              les images de cultures avec une précision de <strong>95%+</strong> pour détecter 
              maladies, parasites et carences nutritionnelles.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Camera className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-bold text-gray-800">Vision par ordinateur</div>
                  <div className="text-sm text-gray-600">Analyse d'images précise</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-gray-800">Machine Learning</div>
                  <div className="text-sm text-gray-600">Apprentissage continu</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-500 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Analyse IA de cultures agricoles"
              className="relative z-10 w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">IA en action</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              L'Impact de Notre Technologie
            </h2>
            <p className="text-xl text-green-100">
              Des résultats concrets pour l'agriculture moderne
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">+35%</div>
              <div className="text-green-100">Augmentation du rendement</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-green-100">Précision de détection</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">-60%</div>
              <div className="text-green-100">Réduction des pertes</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-green-100">Agriculteurs aidés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Solution */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            <div className="relative z-10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Notre Mission</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Révolutionner l'agriculture en fournissant aux agriculteurs des outils d'IA 
                accessibles pour diagnostiquer rapidement les problèmes de santé des cultures 
                et optimiser leurs rendements.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Diagnostic précoce</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Rendement optimisé</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Agriculture durable</span>
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            <div className="relative z-10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Microscope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Notre Solution</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Une application mobile simple où l'agriculteur photographie sa culture. 
                Notre IA analyse l'image en temps réel et fournit un diagnostic détaillé 
                avec des recommandations de traitement.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Analyse instantanée</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Interface simple</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Recommandations précises</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-gray-50 to-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">Notre équipe</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Experts en IA et Agriculture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe pluridisciplinaire de data scientists, ingénieurs agronomes 
              et développeurs full-stack unis par la passion de l'innovation agricole.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Data Scientists */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Data Scientist"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full p-1">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Data Scientists</h3>
              <p className="text-gray-600 text-center">
                Spécialistes en machine learning et computer vision qui développent 
                et optimisent nos modèles d'intelligence artificielle.
              </p>
            </div>

            {/* Ingénieurs Agronomes */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Ingénieur Agronome"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-1">
                  <Microscope className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Ingénieurs Agronomes</h3>
              <p className="text-gray-600 text-center">
                Experts du terrain qui valident nos diagnostics et s'assurent que 
                nos solutions répondent aux besoins réels des agriculteurs.
              </p>
            </div>

            {/* Développeurs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Développeur Full-Stack"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 rounded-full p-1">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Développeurs Full-Stack</h3>
              <p className="text-gray-600 text-center">
                Ingénieurs logiciels qui créent des applications robustes et 
                user-friendly pour démocratiser l'accès à notre technologie.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Révolutionnons l'agriculture ensemble
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Rejoignez les milliers d'agriculteurs qui utilisent déjà notre technologie 
            pour optimiser leurs cultures et maximiser leurs rendements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Tester notre IA
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition-colors duration-300">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;