'use client'

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";

interface SushiDish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  likes: number;
  price: string;
  category: string;
}

interface SushiCarouselProps {
  dishes?: SushiDish[];
  autoplay?: boolean;
  cardsPerView?: number;
}

const SushiCarousel = ({ 
  dishes = [], 
  autoplay = true, 
  cardsPerView = 3 
}: SushiCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [responsiveCardsPerView, setResponsiveCardsPerView] = useState(cardsPerView);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<any | null>(null);

  // Responsive breakpoints
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setResponsiveCardsPerView(1);
      } else if (width < 1024) { // tablet
        setResponsiveCardsPerView(2);
      } else { // desktop
        setResponsiveCardsPerView(cardsPerView);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [cardsPerView]);

  useEffect(() => {
    if (autoplay && dishes.length > responsiveCardsPerView) {
      autoplayIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, dishes.length, responsiveCardsPerView, currentIndex]);

  const cardWidth = 100 / responsiveCardsPerView;

  const nextSlide = () => {
    if (isAnimating || dishes.length <= responsiveCardsPerView) return;
    
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % dishes.length;
    
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
          void containerRef.current.offsetWidth;
          setIsAnimating(false);
        }
      }, 600);
    }
  };

  const prevSlide = () => {
    if (isAnimating || dishes.length <= responsiveCardsPerView) return;
    
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + dishes.length) % dishes.length;
    
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      setCurrentIndex(prevIndex);
      void containerRef.current.offsetWidth;
      
      containerRef.current.style.transition = "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)";
      containerRef.current.style.transform = "translateX(0)";
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const getVisibleCards = () => {
    if (dishes.length <= responsiveCardsPerView) return dishes;
    
    const visibleCards = [];
    for (let i = 0; i < responsiveCardsPerView + 1; i++) {
      const index = (currentIndex + i) % dishes.length;
      visibleCards.push(dishes[index]);
    }
    return visibleCards;
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Nos Créations
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Découvrez nos créations de sushi les plus appréciées par nos clients. 
            Chaque plat est préparé avec passion et des ingrédients de première qualité.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          {dishes.length > responsiveCardsPerView && (
            <>
              <motion.button
                onClick={() => { prevSlide(); stopAutoplay(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button
                onClick={() => { nextSlide(); stopAutoplay(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl mx-2 sm:mx-0">
            <div
              ref={containerRef}
              className="flex"
              style={{
                width: dishes.length > responsiveCardsPerView ? `${(responsiveCardsPerView + 1) * 100 / responsiveCardsPerView}%` : '100%'
              }}
            >
              {getVisibleCards().map((dish, idx) => (
                <motion.div
                  key={`${dish.id}-${currentIndex}-${idx}`}
                  style={{
                    width: dishes.length > responsiveCardsPerView ? `${100 / (responsiveCardsPerView + 1)}%` : `${100 / Math.min(responsiveCardsPerView, dishes.length)}%`
                  }}
                  className="px-2 sm:px-3"
                  onMouseEnter={() => setHoveredCard(dish.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group h-[380px] sm:h-[420px] lg:h-[450px]"
                    whileHover={{ y: window.innerWidth >= 640 ? -8 : -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <motion.img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredCard === dish.id && window.innerWidth >= 640 ? 1.1 : 1
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="bg-temple-pink text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {dish.category}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                          {dish.price}
                        </span>
                      </div>

                      {/* Floating Heart Animation - Only on desktop */}
                      <AnimatePresence>
                        {hoveredCard === dish.id && window.innerWidth >= 640 && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                  x: Math.random() * 200 + 50,
                                  y: 200,
                                  opacity: 0,
                                  scale: 0
                                }}
                                animate={{
                                  y: -20,
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              >
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-temple-pink fill-current" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-temple-pink transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3 sm:mb-4 line-clamp-2">
                        {dish.description}
                      </p>
                      
                      {/* Rating and Likes */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < Math.floor(dish.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700">
                            {dish.rating}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-temple-pink">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-temple-pink fill-current" />
                          <span className="text-xs sm:text-sm font-medium text-temple-pink">{dish.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay - Only on desktop */}
                    <motion.div
                      className="absolute inset-0 bg-temple-pink/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex"
                      initial={false}
                    >
                      <motion.button
                        className="bg-white text-temple-pink px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Commander Maintenant
                      </motion.button>
                    </motion.div>

                    {/* Mobile CTA Button */}
                    <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                      <button className="w-full bg-temple-pink text-white py-2 rounded-lg text-sm font-semibold hover:bg-temple-pink/90 transition-colors">
                        Commander
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center mt-6 sm:hidden">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(dishes.length / responsiveCardsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    stopAutoplay();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / responsiveCardsPerView) === index
                      ? 'bg-red-500 w-6'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultSushiDishes: SushiDish[] = [
  {
    id: 1,
    name: "Dragon Roll Premium",
    description: "Saumon grillé, avocat, concombre, sauce teriyaki, tobiko orange",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    likes: 342,
    price: "18€",
    category: "Premium"
  },
  {
    id: 2,
    name: "Rainbow Maki",
    description: "Thon, saumon, daurade, avocat, riz vinaigré, algue nori",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    likes: 287,
    price: "22€",
    category: "Signature"
  },
  {
    id: 3,
    name: "Sashimi Selection",
    description: "Sélection de poissons frais du jour, wasabi, gingembre mariné",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    likes: 195,
    price: "26€",
    category: "Traditionnel"
  },
  {
    id: 4,
    name: "California Deluxe",
    description: "Crabe, avocat, concombre, mayonnaise épicée, sésame grillé",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    likes: 156,
    price: "16€",
    category: "Classique"
  },
  {
    id: 5,
    name: "Tempura Fusion",
    description: "Crevette tempura, avocat, sauce spicy mayo, graines de sésame",
    imageUrl: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    likes: 203,
    price: "19€",
    category: "Fusion"
  },
];

const NosCreations = () => {
  return (
    <SushiCarousel 
      dishes={defaultSushiDishes}
      autoplay={true}
      cardsPerView={3}
    />
  );
};

export default NosCreations;