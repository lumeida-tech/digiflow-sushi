"use client"

import React from 'react';
import { Star } from 'lucide-react';

const GoogleReviewsCard = () => {
  return (
    <div className="inline-block relative group cursor-pointer">
      {/* Gradient background with glow effect - using hsl(330, 70%, 76%) */}
      <div 
        className="absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"
        style={{ backgroundColor: 'hsl(330, 70%, 76%)' }}
      ></div>
      
      {/* Main card - horizontal layout */}
      <div className="relative bg-white rounded-2xl px-8 py-4 shadow-xl transform transition-all duration-300 group-hover:scale-105 border border-gray-100">
        
        {/* Floating stars animation */}
        <div className="absolute top-1 right-2 opacity-20">
          <Star className="w-3 h-3 text-yellow-400 fill-current animate-bounce" />
        </div>
        <div className="absolute bottom-1 left-2 opacity-25">
          <Star className="w-2 h-2 text-black fill-current animate-bounce delay-300" />
        </div>
        
        {/* Content in responsive flex */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Left side - stars and text */}
          <div className="flex flex-col mb-4 sm:mb-0">
            {/* Rating section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="w-8 h-8 text-yellow-400 fill-current animate-pulse" />
                <span 
                  className="text-3xl font-black"
                  style={{ color: 'hsl(330, 70%, 76%)' }}
                >
                  4.8
                </span>
                <span className="text-lg font-medium text-black">/5</span>
              </div>
              
              <div 
                className="h-8 w-px"
                style={{ backgroundColor: 'hsl(330, 70%, 90%)' }}
              ></div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 text-sm font-medium text-black">
                  <span>sur</span>
                  <div className="flex space-x-0.5">
                    <span className="text-blue-500 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-500 font-bold">e</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section */}
            <div className="text-center">
              <p className="text-sm font-semibold text-black">
                <span 
                  className="text-xl font-black"
                  style={{ color: 'hsl(330, 70%, 76%)' }}
                >
                  150+
                </span> avis
              </p>
              <p className="text-xs text-black opacity-70 mt-1">clients satisfaits</p>
            </div>
          </div>
          
          {/* Right side - button */}
          <div className="flex justify-center">
            <button className="bg-temple-pink text-white px-4 py-2 rounded-lg hover:bg-temple-pink/90 transition duration-300">Voir sur Google</button>
          </div>
        </div>
      </div>
      
     
      
      {/* Top accent line with theme color */}
      <div 
        className="absolute top-0 left-4 right-4 h-1 rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: 'hsl(330, 70%, 76%)' }}
      ></div>
      
      {/* Floating particles with theme colors */}
      <div 
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full opacity-70 animate-ping"
        style={{ backgroundColor: 'hsl(330, 70%, 76%)' }}
      ></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black rounded-full opacity-60 animate-ping delay-700"></div>
    </div>
  );
};

export default GoogleReviewsCard;