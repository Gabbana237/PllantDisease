import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileImage, X, CheckCircle, Leaf, Camera, ArrowRight, AlertTriangle, BookOpen, Droplets } from 'lucide-react';

const PlantDiseaseDetection = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload'); // 'upload' ou 'results'
  const [analysisResults, setAnalysisResults] = useState([]);
  const [apiError, setApiError] = useState(null);
  const fileInputRef = useRef(null);

  // URL de l'API configurée directement
  const API_URL = 'http://localhost:5000';

  // Ajouter les styles d'animation personnalisés
  const styles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `;

  // Fonction pour appeler l'API de prédiction
  const predictDisease = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la prédiction:', error);
      throw error;
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  }, []);

  const processFiles = (newFiles) => {
    const processedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...processedFiles]);

    processedFiles.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
        setFiles(prev => prev.map(f =>
          f.id === fileId ? { ...f, status: 'completed' } : f
        ));
        clearInterval(interval);
      } else {
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.round(progress) }));
      }
    }, 200);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file =>
      file.type.startsWith('image/')
    );
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setApiError(null);

    try {
      const completedFiles = files.filter(f => f.status === 'completed');
      const results = [];

      for (const file of completedFiles) {
        try {
          const prediction = await predictDisease(file.file);

          results.push({
            id: file.id,
            image: file.url,
            fileName: file.name,
            plant: prediction.plant,
            disease: prediction.disease,
            status: prediction.status,
            confidence: prediction.confidence,
            isHealthy: prediction.status === 'SAIN',
            treatment: prediction.status === 'SAIN'
              ? 'Plante en bonne santé ! Continuez les soins habituels.'
              : `Traitement recommandé pour ${prediction.disease}. Consultez un spécialiste pour des conseils spécifiques.`
          });
        } catch (error) {
          console.error(`Erreur pour ${file.name}:`, error);
          results.push({
            id: file.id,
            image: file.url,
            fileName: file.name,
            plant: 'Inconnu',
            disease: 'Erreur d\'analyse',
            status: 'ERREUR',
            confidence: '0%',
            isHealthy: false,
            treatment: 'Impossible d\'analyser cette image. Veuillez réessayer avec une image plus claire.'
          });
        }
      }

      setAnalysisResults(results);
      setCurrentPage('results');
    } catch (error) {
      setApiError('Erreur lors de l\'analyse des images');
      console.error('Erreur globale:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setCurrentPage('upload');
    setFiles([]);
    setAnalysisResults([]);
    setUploadProgress({});
    setApiError(null);
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const canAnalyze = completedFiles.length > 0 && !isAnalyzing;

  // Page de téléchargement
  const UploadPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diagnostic Plantes IA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Téléchargez vos photos de plantes pour détecter les maladies avec notre IA
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Affichage des erreurs API */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800 font-medium">{apiError}</p>
              </div>
            </div>
          )}

          {/* Zone de téléchargement avec drag & drop */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-16 mb-8 transition-all duration-300 ${isDragging
              ? 'border-blue-400 bg-blue-50 shadow-lg scale-105'
              : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Effet de survol */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl animate-pulse"></div>
            )}

            <div className="text-center relative z-10">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${isDragging
                ? 'bg-blue-100 scale-110'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                <Upload className={`w-10 h-10 transition-all duration-300 ${isDragging ? 'text-blue-600 animate-bounce' : 'text-gray-600'
                  }`} />
              </div>

              <h3 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${isDragging ? 'text-blue-700' : 'text-gray-900'
                }`}>
                {isDragging ? 'Déposez vos photos ici' : 'Télécharger des images'}
              </h3>

              <p className={`text-lg mb-2 transition-colors duration-300 ${isDragging ? 'text-blue-600' : 'text-gray-600'
                }`}>
                Glissez et déposez vos fichiers ici
              </p>

              <p className="text-gray-500 mb-8">
                ou cliquez pour parcourir vos fichiers
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${isDragging
                  ? 'scale-105'
                  : 'hover:scale-105'
                  } shadow-lg hover:shadow-xl text-gray-900`}
                style={{ backgroundColor: "#FACC15" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#EAB308";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#FACC15";
                }}
              >
                Sélectionner des images
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Indicateurs visuels */}
            {isDragging && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-150"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-300"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-450"></div>
              </div>
            )}
          </div>

          {/* Liste des fichiers */}
          {files.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FileImage className="w-5 h-5 mr-2 text-green-600" />
                Photos téléchargées ({files.length})
              </h3>

              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Préparation...</span>
                            <span>{uploadProgress[file.id] || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.id] || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {file.status === 'completed' && (
                        <div className="flex items-center text-green-600 text-sm mt-1">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>Prête pour analyse</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFile(file.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bouton d'analyse */}
          {completedFiles.length > 0 && (
            <div className="text-center">
              <button
                onClick={startAnalysis}
                disabled={!canAnalyze}
                className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center mx-auto space-x-3 ${!canAnalyze
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'text-gray-900 shadow-lg hover:scale-105'
                  }`}
                style={canAnalyze ? { backgroundColor: "#FACC15" } : {}}
                onMouseEnter={(e) => {
                  if (canAnalyze) {
                    e.target.style.backgroundColor = "#EAB308";
                  }
                }}
                onMouseLeave={(e) => {
                  if (canAnalyze) {
                    e.target.style.backgroundColor = "#FACC15";
                  }
                }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    <span>Analyser avec l'IA</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {isAnalyzing && (
                <div className="mt-6 max-w-md mx-auto animate-fadeIn">
                  <div className="bg-white rounded-lg shadow-lg border p-6 relative overflow-hidden">
                    {/* Animation de fond */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 animate-pulse"></div>

                    {/* Particules flottantes */}
                    <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-4 right-6 w-1 h-1 bg-green-400 rounded-full animate-bounce delay-150"></div>
                    <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="relative">
                          <Leaf className="w-6 h-6 text-green-600 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-gray-900 font-semibold text-lg">Analyse IA en cours</span>
                      </div>

                      {/* Barre de progression améliorée */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-full animate-pulse relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <p className="text-gray-700 font-medium animate-pulse">
                          🔍 Détection des maladies...
                        </p>
                        <p className="text-gray-600 text-sm">
                          L'IA analyse vos images avec précision
                        </p>
                      </div>

                      {/* Indicateurs de progression */}
                      <div className="flex justify-center space-x-2 mt-4">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Page de résultats
  const ResultsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header des résultats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Résultats de l'analyse
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Voici les résultats de l'analyse de vos plantes par l'IA
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Résultats */}
          <div className="grid gap-8 mb-8">
            {analysisResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={result.image}
                      alt={result.fileName}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {result.fileName}
                        </h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            🌱 {result.plant}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${result.isHealthy
                            ? 'bg-green-100 text-green-800'
                            : result.status === 'ERREUR'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {result.isHealthy ? (
                              <CheckCircle className="w-4 h-4 mr-1" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 mr-1" />
                            )}
                            {result.disease}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-2xl font-bold ${result.isHealthy ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {result.confidence}
                        </div>
                        <div className="text-sm text-gray-500">Confiance</div>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${result.isHealthy ? 'bg-green-50' : 'bg-blue-50'
                      }`}>
                      <div className="flex items-start">
                        <Droplets className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${result.isHealthy ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        <div>
                          <h4 className={`font-medium mb-1 ${result.isHealthy ? 'text-green-900' : 'text-blue-900'
                            }`}>
                            {result.isHealthy ? 'Recommandations' : 'Traitement recommandé'}
                          </h4>
                          <p className={`text-sm ${result.isHealthy ? 'text-green-800' : 'text-blue-800'
                            }`}>
                            {result.treatment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetAnalysis}
              className="px-6 py-3 border border-yellow-500 rounded-lg font-medium text-gray-900 hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-md"
              style={{ backgroundColor: "#FACC15" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#EAB308";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FACC15";
              }}
            >
              <Camera className="w-5 h-5" />
              <span>Nouvelle analyse</span>
            </button>

            <button
              className="px-6 py-3 text-gray-900 hover:scale-105 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-md"
              style={{ backgroundColor: "#FACC15" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#EAB308";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FACC15";
              }}
            >
              <BookOpen className="w-5 h-5" />
              <span>Guide de traitement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      {currentPage === 'upload' ? <UploadPage /> : <ResultsPage />}
    </>
  );
};

export default PlantDiseaseDetection;