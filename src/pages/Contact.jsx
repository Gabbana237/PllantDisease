import React, { useState } from 'react';
import axios from 'axios';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await axios.post('http://192.168.158.27:8000/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setFeedback({
        type: 'success',
        message: "Merci pour votre message ! Nous reviendrons vers vous sous peu."
      });

      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: "Une erreur est survenue. Veuillez réessayer plus tard."
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">Contactez-nous</h1>
        <p className="text-gray-600 mb-8">
          Une question, une suggestion ou besoin d’assistance ? Envoyez-nous un message !
        </p>

        {feedback && (
          <div className={`mb-4 p-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean.dupont@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Écrivez votre message ici..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow duration-200"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold rounded-lg transition-colors duration-200 text-center"
            style={{ backgroundColor: '#FACC15' }}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
