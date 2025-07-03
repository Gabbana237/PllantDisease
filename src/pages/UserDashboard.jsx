import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Leaf,
  BarChart3
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Données utilisateur simplifiées
  const userData = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    analysesCount: 47,
    plantsCount: 23,
    successRate: 94
  };

  // Historique simplifié (5 analyses récentes)
  const recentAnalyses = [
    {
      id: 1,
      date: "28 juin",
      plantName: "Rosier",
      disease: "Oïdium",
      status: "traité",
      confidence: 92
    },
    {
      id: 2,
      date: "27 juin",
      plantName: "Tomate",
      disease: "Mildiou",
      status: "en_traitement",
      confidence: 89
    },
    {
      id: 3,
      date: "25 juin",
      plantName: "Basilic",
      disease: "Fusariose",
      status: "surveillé",
      confidence: 85
    },
    {
      id: 4,
      date: "23 juin",
      plantName: "Lavande",
      disease: "Plante saine",
      status: "sain",
      confidence: 96
    },
    {
      id: 5,
      date: "20 juin",
      plantName: "Géranium",
      disease: "Rouille",
      status: "traité",
      confidence: 91
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sain': return 'text-green-600 bg-green-50';
      case 'traité': return 'text-blue-600 bg-blue-50';
      case 'en_traitement': return 'text-orange-600 bg-orange-50';
      case 'surveillé': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header simplifié */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue {userData.name}</p>
        </div>

        {/* Navigation simplifiée */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'history', label: 'Historique', icon: Clock },
            { id: 'profile', label: 'Profil', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-green-600 text-darkgreen'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Contenu selon l'onglet */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userData.analysesCount}</div>
                <div className="text-sm text-gray-600">Analyses</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userData.plantsCount}</div>
                <div className="text-sm text-gray-600">Plantes</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{userData.successRate}%</div>
                <div className="text-sm text-gray-600">Réussite</div>
              </div>
            </div>

            {/* Analyses récentes */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Analyses récentes</h2>
              </div>
              <div className="divide-y">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{analysis.plantName}</div>
                      <div className="text-sm text-gray-600">{analysis.disease}</div>
                      <div className="text-xs text-gray-500">{analysis.date}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-600">{analysis.confidence}%</div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(analysis.status)}`}>
                        {getStatusIcon(analysis.status)}
                        <span className="ml-1 capitalize">{analysis.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Historique complet</h2>
            </div>
            <div className="divide-y">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{analysis.plantName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(analysis.status)}`}>
                          {getStatusIcon(analysis.status)}
                          <span className="ml-1 capitalize">{analysis.status.replace('_', ' ')}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{analysis.disease}</div>
                      <div className="text-xs text-gray-500">{analysis.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{analysis.confidence}%</div>
                      <div className="text-xs text-gray-500">Confiance</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Mon profil</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{userData.name}</div>
                    <div className="text-gray-600">{userData.email}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Analyses effectuées</div>
                    <div className="text-2xl font-bold text-gray-900">{userData.analysesCount}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Plantes suivies</div>
                    <div className="text-2xl font-bold text-gray-900">{userData.plantsCount}</div>
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