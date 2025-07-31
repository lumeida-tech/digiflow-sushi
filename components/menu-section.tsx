import React, { useState } from 'react';
import { ShoppingBag, Utensils, Clock, Star } from 'lucide-react';

const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sur-place');

  const menuItems = {
    'sur-place': [
      {
        name: 'Menu Dégustation Premium',
        description: 'Une sélection de nos meilleurs sushis et spécialités japonaises',
        price: '45€',
        image: 'gradient-premium',
        popular: true
      },
      {
        name: 'Plateau Découverte',
        description: '18 pièces variées pour découvrir notre savoir-faire',
        price: '32€',
        image: 'gradient-discovery'
      },
      {
        name: 'Menu Tradition',
        description: 'Les classiques revisités avec nos produits d\'exception',
        price: '38€',
        image: 'gradient-tradition'
      }
    ],
    'emporter': [
      {
        name: 'Plateau Libre Service',
        description: 'Sélection fraîche disponible en frigo à l\'entrée',
        price: '15€-25€',
        image: 'gradient-takeaway',
        popular: true
      },
      {
        name: 'Commande Express',
        description: 'Prêt en 15 minutes, parfait pour les gourmets pressés',
        price: '20€',
        image: 'gradient-express'
      },
      {
        name: 'Plateau Famille',
        description: '30 pièces pour partager en famille ou entre amis',
        price: '55€',
        image: 'gradient-family'
      }
    ]
  };

  return (
    <section id="menus" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Nos <span className="text-gradient bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Menus</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de créations japonaises, préparées avec des ingrédients d'exception
          </p>
        </div>

        {/* Menu Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-2 flex">
            <button
              onClick={() => setActiveTab('sur-place')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'sur-place'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              <Utensils size={20} />
              <span>Sur Place</span>
            </button>
            <button
              onClick={() => setActiveTab('emporter')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'emporter'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              <ShoppingBag size={20} />
              <span>À Emporter</span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {item.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star size={14} className="fill-white" />
                  <span>Populaire</span>
                </div>
              )}
              
              {/* Image Placeholder */}
              <div className={`h-48 bg-gradient-to-br ${
                item.image === 'gradient-premium' ? 'from-purple-200 to-pink-300' :
                item.image === 'gradient-discovery' ? 'from-blue-200 to-pink-300' :
                item.image === 'gradient-tradition' ? 'from-green-200 to-pink-300' :
                item.image === 'gradient-takeaway' ? 'from-orange-200 to-pink-300' :
                item.image === 'gradient-express' ? 'from-red-200 to-pink-300' :
                'from-yellow-200 to-pink-300'
              } relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🍣</div>
                    <p className="text-sm opacity-90">Photo du menu</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                    {item.price}
                  </span>
                  <button className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <span>Commander</span>
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Highlight */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="text-pink-500 mr-2" size={24} />
            <h3 className="text-2xl font-bold text-black">Service Libre-Service</h3>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Découvrez notre concept unique ! Des plateaux fraîchement préparés vous attendent dans notre frigo réfrigéré à l'entrée. 
            Parfait pour une pause déjeuner rapide sans compromis sur la qualité.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;