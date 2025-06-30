import React, { useState } from 'react';
import { Play, Clock, Users, Eye, Brain, Smartphone, BookOpen, Award, Filter, Search } from 'lucide-react';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const videoCategories = [
    { id: 'all', name: 'Toutes les vidéos', icon: BookOpen },
    { id: 'ai-basics', name: 'IA & Diagnostic', icon: Brain },
    { id: 'mobile-app', name: 'Application Mobile', icon: Smartphone },
    { id: 'diseases', name: 'Maladies des Plantes', icon: Eye },
    { id: 'success-stories', name: 'Témoignages', icon: Award }
  ];

  const videos = [
    {
      id: 1,
      category: 'ai-basics',
      title: 'Comment notre IA détecte les maladies des plantes',
      description: 'Découvrez le fonctionnement de notre modèle d\'intelligence artificielle et comment il analyse vos cultures en temps réel.',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '8:45',
      views: '12.5K',
      level: 'Débutant',
      featured: true
    },
    {
      id: 2,
      category: 'mobile-app',
      title: 'Guide complet de l\'application mobile',
      description: 'Tutoriel pas à pas pour utiliser notre application : de la prise de photo au diagnostic final.',
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '12:30',
      views: '18.2K',
      level: 'Débutant',
      featured: true
    },
    {
      id: 3,
      category: 'diseases',
      title: 'Reconnaître le mildiou sur les tomates',
      description: 'Apprenez à identifier les premiers signes du mildiou et les actions préventives recommandées par notre IA.',
      thumbnail: 'https://images.unsplash.com/photo-1592841200221-21e1c0d6e8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '6:15',
      views: '9.8K',
      level: 'Intermédiaire'
    },
    {
      id: 4,
      category: 'success-stories',
      title: 'Témoignage : +40% de rendement avec notre IA',
      description: 'Jean-Pierre, agriculteur dans la Beauce, partage son expérience et les résultats obtenus après 6 mois d\'utilisation.',
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '10:22',
      views: '25.6K',
      level: 'Tous niveaux',
      featured: true
    },
    {
      id: 5,
      category: 'diseases',
      title: 'Détecter les carences nutritionnelles',
      description: 'Comment notre modèle identifie les déficiences en azote, phosphore et potassium à partir des feuilles.',
      thumbnail: 'https://images.unsplash.com/photo-1574263867128-b20b0a61b0b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '9:18',
      views: '7.3K',
      level: 'Avancé'
    },
    {
      id: 6,
      category: 'ai-basics',
      title: 'Formation : Optimiser vos photos pour l\'IA',
      description: 'Techniques de prise de vue pour maximiser la précision de nos diagnostics automatisés.',
      thumbnail: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '5:42',
      views: '11.9K',
      level: 'Débutant'
    },
    {
      id: 7,
      category: 'success-stories',
      title: 'Coopérative agricole : ROI de 300%',
      description: 'La coopérative de Bretagne explique comment l\'IA a transformé leur approche de la protection des cultures.',
      thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '14:05',
      views: '33.1K',
      level: 'Tous niveaux'
    },
    {
      id: 8,
      category: 'mobile-app',
      title: 'Nouvelles fonctionnalités : Suivi des traitements',
      description: 'Découvrez comment planifier et suivre vos traitements directement depuis l\'application.',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '7:33',
      views: '6.7K',
      level: 'Intermédiaire'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredVideos = videos.filter(video => video.featured);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 text-white py-16">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Formation & Tutoriels IA Agricole
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Apprenez à utiliser notre intelligence artificielle pour maximiser vos rendements 
            et protéger vos cultures efficacement
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600">50+</div>
              <div className="text-gray-600">Vidéos disponibles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">150K+</div>
              <div className="text-gray-600">Vues totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">5000+</div>
              <div className="text-gray-600">Agriculteurs formés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">4.8/5</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Videos */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Vidéos à la une
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    À LA UNE
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                      {video.level}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {video.views}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {videoCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {video.views}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                    {video.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune vidéo trouvée
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre agriculture ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez les milliers d'agriculteurs qui utilisent déjà notre IA pour optimiser leurs cultures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
              Télécharger l'app
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors">
              Demander une démo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;