import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileImage, X, CheckCircle, Leaf, Zap, Camera, ArrowRight, AlertTriangle, BookOpen, Droplets } from 'lucide-react';

const PlantDiseaseDetection = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload'); // 'upload' ou 'results'
  const [analysisResults, setAnalysisResults] = useState([]);
  const fileInputRef = useRef(null);

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

  const startAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Générer des résultats simulés
      const mockResults = files.filter(f => f.status === 'completed').map((file, index) => ({
        id: file.id,
        image: file.url,
        fileName: file.name,
        disease: ['Mildiou', 'Oïdium', 'Rouille', 'Pourriture noire', 'Anthracnose'][index % 5],
        severity: ['Faible', 'Modérée', 'Élevée'][Math.floor(Math.random() * 3)],
        confidence: 85 + Math.floor(Math.random() * 10),
        treatment: [
          'Traitement fongicide préventif recommandé',
          'Améliorer la circulation de l\'air autour de la plante',
          'Retirer les parties infectées et appliquer un traitement curatif',
          'Surveiller l\'arrosage et éviter l\'humidité excessive',
          'Traitement biologique avec des préparations à base de cuivre'
        ][index % 5]
      }));
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setCurrentPage('results');
    }, 3000);
  };

  const resetAnalysis = () => {
    setCurrentPage('upload');
    setFiles([]);
    setAnalysisResults([]);
    setUploadProgress({});
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const canAnalyze = completedFiles.length > 0 && !isAnalyzing;

  // Page de téléchargement
  const UploadPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header simple */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diagnostic Plantes IA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Téléchargez vos photos de plantes pour détecter les maladies et obtenir des conseils de traitement
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Zone de téléchargement avec drag & drop amélioré */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-16 mb-8 transition-all duration-300 ${
              isDragging
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
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${
                isDragging 
                  ? 'bg-blue-100 scale-110' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <Upload className={`w-10 h-10 transition-all duration-300 ${
                  isDragging ? 'text-blue-600 animate-bounce' : 'text-gray-600'
                }`} />
              </div>
              
              <h3 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
                isDragging ? 'text-blue-700' : 'text-gray-900'
              }`}>
                {isDragging ? 'Déposez vos photos ici' : 'Upload Image'}
              </h3>
              
              <p className={`text-lg mb-2 transition-colors duration-300 ${
                isDragging ? 'text-blue-600' : 'text-gray-600'
              }`}>
                or drop a file,
              </p>
              
              <p className="text-gray-500 mb-8">
                paste image or <span className="text-blue-600 underline cursor-pointer">URL</span>
              </p>

              <button
                 style={{ backgroundColor: '#FACC15' }}
                onClick={() => fileInputRef.current?.click()}
                className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                  isDragging
                    ? 'bg-blue-600 hover:bg-blue-700 text-white scale-105'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                } shadow-lg hover:shadow-xl`}
              >
                Upload Image
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
                            <span>Upload en cours...</span>
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
                          <span >Prête pour analyse</span>
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
                style={{ backgroundColor: '#FACC15' }}
                disabled={!canAnalyze}
                className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center mx-auto space-x-3 ${
                  canAnalyze
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    <span>Analyser les maladies</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {isAnalyzing && (
                <div className="mt-6 max-w-md mx-auto">
                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 font-medium">Analyse IA en cours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 text-center">
                      Détection des maladies et parasites...
                    </p>
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
            Voici les maladies détectées sur vos plantes et les traitements recommandés
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Résultats */}
          <div className="grid gap-8 mb-8">
            {analysisResults.map((result, index) => (
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
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {result.disease}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            result.severity === 'Faible' ? 'bg-yellow-100 text-yellow-800' :
                            result.severity === 'Modérée' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Sévérité: {result.severity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{result.confidence}%</div>
                        <div className="text-sm text-gray-500">Confiance</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <Droplets className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Traitement recommandé</h4>
                          <p className="text-blue-800 text-sm">{result.treatment}</p>
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
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Nouvelle analyse</span>
            </button>
            
            <button    style={{ backgroundColor: '#FACC15' }} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Guide de traitement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return currentPage === 'upload' ? <UploadPage /> : <ResultsPage />;
};

export default PlantDiseaseDetection;