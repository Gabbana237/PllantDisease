import React, { useState, useRef, useCallback } from 'react';
import {
  Upload,
  FileImage,
  X,
  CheckCircle,
  Leaf,
  Camera,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  Droplets,
  ArrowLeft,
  Clock,
  Thermometer,
  Zap
} from 'lucide-react';

const PlantDiseaseDetection = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload'); // 'upload', 'results', 'guide'
  const [analysisResults, setAnalysisResults] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = 'http://localhost:5000'; // Ton API Flask

  // Base de données des traitements pour chaque maladie
  const treatmentDatabase = {
    "Pepper_bell__Bacterial_spot": {
      name: "Tache bactérienne du poivron",
      plant: "Poivron",
      severity: "Modérée",
      description: "Infection bactérienne causée par Xanthomonas spp.",
      symptoms: ["Taches noires", "Défoliation"],
      causes: ["Humidité élevée", "Température chaude"],
      treatment: {
        immediate: [
          "Retirer les feuilles infectées",
          "Améliorer la circulation d'air"
        ],
        chemical: ["Pulvérisation de sulfate de cuivre"],
        organic: ["Spray au bicarbonate"]
      },
      prevention: ["Arroser au pied", "Nettoyer régulièrement"]
    },
    "Pepper_bell__healthy": {
      name: "Poivron sain",
      plant: "Poivron",
      severity: "Aucune",
      description: "Votre poivron est en parfaite santé !",
      symptoms: ["Feuilles vertes", "Croissance normale"],
      causes: ["Soins appropriés"],
      treatment: {
        maintenance: ["Continuez à bien arroser et fertiliser"]
      }
    },
    "Tomato_healthy": {
      name: "Tomate saine",
      plant: "Tomate",
      severity: "Aucune",
      description: "Votre tomate est en parfaite santé !",
      symptoms: ["Feuillage vert", "Fruits abondants"],
      causes: ["Conditions optimales"],
      treatment: {
        maintenance: ["Arrosage régulier", "Fertilisation équilibrée"]
      }
    }
    // Tu peux ajouter toutes les autres maladies ici...
  };

  // Appel à l'API Flask
  const predictDisease = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de la prédiction");

      const data = await response.json();

      // Construire la clé attendue dans treatmentDatabase
      const predictedClassName = `${data.plant}__${data.disease.replace(/\s+/g, '_')}`;
      const matchedDiseaseKey = Object.keys(treatmentDatabase).find(
        key => key.toLowerCase() === predictedClassName.toLowerCase()
      );

      return {
        plant: data.plant,
        disease: data.disease,
        status: data.status,
        confidence: data.confidence,
        diseaseKey: matchedDiseaseKey || null
      };
    } catch (error) {
      console.error("Échec de la prédiction via l'API:", error);
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
          const diseaseData = prediction.diseaseKey
            ? treatmentDatabase[prediction.diseaseKey]
            : treatmentDatabase["Tomato_healthy"];
          results.push({
            id: file.id,
            image: file.url,
            fileName: file.name,
            plant: prediction.plant,
            disease: prediction.disease,
            status: prediction.status,
            confidence: prediction.confidence,
            diseaseKey: prediction.diseaseKey,
            isHealthy: prediction.status === 'SAIN',
            treatment: diseaseData.treatment?.immediate?.[0] || 'Aucun traitement spécifique requis.'
          });
        } catch (error) {
          results.push({
            id: file.id,
            image: file.url,
            fileName: file.name,
            plant: 'Inconnu',
            disease: 'Erreur d\'analyse',
            status: 'ERREUR',
            confidence: '0%',
            diseaseKey: null,
            isHealthy: false,
            treatment: 'Impossible d\'analyser cette image.'
          });
        }
      }
      setAnalysisResults(results);
      setCurrentPage('results');
    } catch (error) {
      setApiError('Erreur lors de l\'analyse des images');
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

  const showTreatmentGuide = (diseaseKey) => {
    setSelectedDisease(diseaseKey);
    setCurrentPage('guide');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critique': return 'text-red-600 bg-red-100';
      case 'Élevée': return 'text-orange-600 bg-orange-100';
      case 'Modérée': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  // Pages
  const UploadPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Contenu de la page upload */}
      <h2>Glissez-déposez vos images ici</h2>
      {/* Coller le JSX complet de ta page upload ici si besoin */}
    </div>
  );

  const ResultsPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Contenu de la page résultats */}
      <h2>Résultats de l'analyse</h2>
      {/* Coller le JSX complet de ta page résultats ici si besoin */}
    </div>
  );

  const TreatmentGuidePage = () => {
    const diseaseData = selectedDisease ? treatmentDatabase[selectedDisease] : null;

    if (!diseaseData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Guide de traitement non disponible</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Contenu du guide de traitement */}
        <h2>Guide détaillé - {diseaseData.name}</h2>
        {/* Coller le JSX complet de ta page guide ici si besoin */}
      </div>
    );
  };

  return (
    <>
      {currentPage === 'upload' && <UploadPage />}
      {currentPage === 'results' && <ResultsPage />}
      {currentPage === 'guide' && <TreatmentGuidePage />}
    </>
  );
};

export default PlantDiseaseDetection;