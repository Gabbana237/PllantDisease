import React, { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    alert("Merci pour votre message ! Nous reviendrons vers vous sous peu.");
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">Contactez-nous</h1>
        <p className="text-gray-600 mb-8">
          Une question, une suggestion ou besoin d’assistance ? Envoyez-nous un message !
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Votre nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
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
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Votre message
            </label>
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
              ></textarea>
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold rounded-lg transition-colors duration-200 text-center"
            style={{ backgroundColor: '#FACC15' }}
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;