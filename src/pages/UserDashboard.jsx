import React, { useState } from 'react';
import api from "../api/api";
import { 
  User, 
  Camera, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Leaf,
  BarChart3,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Shield,
  CreditCard
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données simulées de l'utilisateur
  const userData = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Lyon, France",
    joinDate: "Mars 2024",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    subscription: "Premium",
    analysesCount: 47,
    plantsCount: 23,
    successRate: 94
  };

  // Historique des analyses
  const analysisHistory = [
    {
      id: 1,
      date: "2024-06-28",
      time: "14:30",
      plantName: "Rosier 'Pierre de Ronsard'",
      disease: "Oïdium",
      severity: "Modérée",
      status: "traité",
      confidence: 92,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      date: "2024-06-27",
      time: "10:15",
      plantName: "Tomate 'Cœur de Bœuf'",
      disease: "Mildiou",
      severity: "Élevée",
      status: "en_traitement",
      confidence: 89,
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      date: "2024-06-25",
      time: "16:45",
      plantName: "Basilic",
      disease: "Fusariose",
      severity: "Faible",
      status: "surveillé",
      confidence: 85,
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      date: "2024-06-23",
      time: "09:20",
      plantName: "Lavande",
      disease: "Aucune maladie détectée",
      severity: "Sain",
      status: "sain",
      confidence: 96,
      image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      date: "2024-06-20",
      time: "11:30",
      plantName: "Géranium",
      disease: "Rouille",
      severity: "Modérée",
      status: "traité",
      confidence: 91,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=100&h=100&fit=crop"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sain': return 'bg-green-100 text-green-800';
      case 'traité': return 'bg-blue-100 text-blue-800';
      case 'en_traitement': return 'bg-orange-100 text-orange-800';
      case 'surveillé': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sain': return <CheckCircle className="w-4 h-4" />;
      case 'traité': return <CheckCircle className="w-4 h-4" />;
      case 'en_traitement': return <Clock className="w-4 h-4" />;
      case 'surveillé': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredHistory = analysisHistory.filter(item => {
    const matchesSearch = item.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.disease.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'history', label: 'Historique', icon: Clock },
              { id: 'profile', label: 'Profil', icon: User }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Analyses totales</p>
                    <p className="text-3xl font-bold text-gray-900">{userData.analysesCount}</p>
                  </div>
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Plantes suivies</p>
                    <p className="text-3xl font-bold text-gray-900">{userData.plantsCount}</p>
                  </div>
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                    <p className="text-3xl font-bold text-green-600">{userData.successRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
             
            </div>

            {/* Analyses récentes */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Analyses récentes</h2>
              </div>
              <div className="p-0">
                {analysisHistory.slice(0, 3).map((analysis) => (
                  <div key={analysis.id} className="flex items-center p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <img
                      src={analysis.image}
                      alt={analysis.plantName}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{analysis.plantName}</h3>
                        <span className="text-sm text-gray-500">{analysis.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{analysis.disease}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                          {getStatusIcon(analysis.status)}
                          <span className="ml-1 capitalize">{analysis.status.replace('_', ' ')}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{analysis.confidence}%</div>
                      <div className="text-xs text-gray-500">Confiance</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            {/* Filtres et recherche */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher par plante ou maladie..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="sain">Sain</option>
                    <option value="traité">Traité</option>
                    <option value="en_traitement">En traitement</option>
                    <option value="surveillé">Surveillé</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Liste de l'historique */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Historique des analyses ({filteredHistory.length})
                </h2>
              </div>
              <div className="divide-y">
                {filteredHistory.map((analysis) => (
                  <div key={analysis.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={analysis.image}
                        alt={analysis.plantName}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {analysis.plantName}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {analysis.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {analysis.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-900 font-medium">
                                {analysis.disease}
                              </span>
                              {analysis.disease !== "Aucune maladie détectée" && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  analysis.severity === 'Faible' ? 'bg-yellow-100 text-yellow-800' :
                                  analysis.severity === 'Modérée' ? 'bg-orange-100 text-orange-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {analysis.severity}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                {analysis.confidence}%
                              </div>
                              <div className="text-xs text-gray-500">Confiance</div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(analysis.status)}`}>
                              {getStatusIcon(analysis.status)}
                              <span className="ml-1 capitalize">{analysis.status.replace('_', ' ')}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Informations personnelles */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                  <Edit3 className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{userData.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{userData.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{userData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;