import React, { useState, useEffect } from "react";
import {
  User,
  Camera,
  CheckCircle,
  AlertTriangle,
  Clock,
  Leaf
} from "lucide-react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState({
    // valeurs par défaut si rien en storage
    name: "Utilisateur",
    email: "email@example.com",
    analysesCount: 0,
    plantsCount: 0,
    successRate: 0
  });

  /* --------- Charger l’utilisateur depuis localStorage --------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUserData({
          name: parsed.username || parsed.name || "Utilisateur",
          email: parsed.email || "email@example.com",
          analysesCount: parsed.analysesCount || 0,
          plantsCount: parsed.plantsCount || 0,
          successRate: parsed.successRate || 0
        });
      }
    } catch {
      // JSON mal formé : on garde les valeurs par défaut
    }
  }, []);

  /* -------- Historique fictif (remplace par appel API si besoin) -------- */
  const recentAnalyses = [
    /* … tes données fictives ou récupérées d’une API … */
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "sain":
        return "text-green-600 bg-green-50";
      case "traité":
        return "text-blue-600 bg-blue-50";
      case "en_traitement":
        return "text-orange-600 bg-orange-50";
      case "surveillé":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sain":
      case "traité":
        return <CheckCircle className="w-4 h-4" />;
      case "en_traitement":
        return <Clock className="w-4 h-4" />;
      case "surveillé":
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue {userData.name}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: "overview", label: "Aperçu", icon: Leaf },
            { id: "history", label: "Historique", icon: Clock },
            { id: "profile", label: "Profil", icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Contenu selon l'onglet */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {userData.analysesCount}
                </div>
                <div className="text-sm text-gray-600">Analyses</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {userData.plantsCount}
                </div>
                <div className="text-sm text-gray-600">Plantes</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {userData.successRate}%
                </div>
                <div className="text-sm text-gray-600">Réussite</div>
              </div>
            </div>

            {/* Analyses récentes (fictif) */}
            {/* … Garde ton bloc d’analyses récentes si souhaité … */}
          </div>
        )}

        {activeTab === "history" && (
          /* … ton bloc Historique complet … */
          <></>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Mon profil</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {userData.name}
                  </div>
                  <div className="text-gray-600">{userData.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Analyses effectuées</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.analysesCount}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Plantes suivies</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.plantsCount}
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
