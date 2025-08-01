"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Truck } from "lucide-react"
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Instagram,
  ShoppingCart,
  User,
  MenuIcon,
  X,
  ChevronDown,
  Heart,
  Utensils,
  Fish,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  UtensilsCrossed,
  ShoppingBag,
  Navigation,
  Send,
  Mail,
  Facebook,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReviewMarquee } from "@/components/review"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { ShineBorder } from "@/components/magicui/shine-border"
import dynamic from "next/dynamic"
import LanguageSwitcher from "@/components/language-switcher"
import GoogleReviewsCard from "@/components/google-review-card"

const NosCreations = dynamic(
  () => import('../components/our-creation-section'),
  { ssr: false }
)

// Hook personnalisé pour détecter la visibilité des sections
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(ref) // Une fois animé, on n'observe plus
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])

  return [setRef, isInView]
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("accueil")
  const [scrollY, setScrollY] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
  }

  const [cart, setCart] = useState<CartItem[]>([])
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuSurPlace = [
    {
      category: "Sashimi Premium",
      items: [
        {
          id: 1,
          name: "Sashimi Saumon",
          price: 8,
          description: "Saumon frais de Norvège",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 2,
          name: "Sashimi Thon Rouge",
          price: 12,
          description: "Thon rouge de Méditerranée",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 3,
          name: "Sashimi Daurade",
          price: 9,
          description: "Daurade royale française",
          image: "/final-img.png?height=200&width=300",
        },
      ],
    },
    {
      category: "Maki Signature",
      items: [
        {
          id: 4,
          name: "Dragon Roll",
          price: 14,
          description: "Avocat, concombre, saumon, sauce teriyaki",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 5,
          name: "Rainbow Roll",
          price: 16,
          description: "Assortiment de poissons frais",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 6,
          name: "Temple Roll",
          price: 18,
          description: "Notre création exclusive",
          image: "/final-img.png?height=200&width=300",
        },
      ],
    },
  ]

  const menuLivraisons = menuSurPlace

  const menuAEmporter = [
    {
      category: "Plateaux Découverte",
      items: [
        {
          id: 7,
          name: "Plateau Débutant",
          price: 25,
          description: "12 pièces variées pour découvrir",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 8,
          name: "Plateau Gourmand",
          price: 35,
          description: "18 pièces de nos spécialités",
          image: "/final-img.png?height=200&width=300",
        },
        {
          id: 9,
          name: "Plateau Premium",
          price: 50,
          description: "24 pièces de nos créations d'exception",
          image: "/final-img.png?height=200&width=300",
        },
      ],
    },
  ]

  const creations = [
    {
      name: "Sushi Saumon Avocat",
      image: "/final-img.png?height=300&width=400",
    },
    {
      name: "Maki California",
      image: "/final-img.png?height=300&width=400",
    },
    {
      name: "Sashimi Thon",
      image: "/final-img.png?height=300&width=400",
    },
    {
      name: "Chirashi Bowl",
      image: "/final-img.png?height=300&width=400",
    },
    {
      name: "Nigiri Assortiment",
      image: "/final-img.png?height=300&width=400",
    },
    {
      name: "Temaki Saumon",
      image: "/final-img.png?height=300&width=400",
    },
  ]

  const reviews = [
    {
      name: "Marie L.",
      rating: 5,
      comment: "Une expérience exceptionnelle ! La qualité est au rendez-vous.",
      date: "Il y a 2 jours",
    },
    {
      name: "Thomas M.",
      rating: 5,
      comment: "Le meilleur sushi de la région. Fraîcheur garantie !",
      date: "Il y a 1 semaine",
    },
    {
      name: "Sophie D.",
      rating: 5,
      comment: "Ambiance authentique et produits d'exception.",
      date: "Il y a 2 semaines",
    },
  ]

  // Refs pour les animations des sections
  const [heroRef, heroInView] = useInView()
  const [aboutRef, aboutInView] = useInView()
  const [menusRef, menusInView] = useInView()
  const [servicesRef, servicesInView] = useInView()
  const [creationsRef, creationsInView] = useInView()
  const [reviewsRef, reviewsInView] = useInView()
  const [instagramRef, instagramInView] = useInView()
  const [contactRef, contactInView] = useInView()

  const addToCart = (item: { id: any; name: string; price: number; description?: string; image?: string }) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: any) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: any, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleOrderSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Redirection vers la page de commande
    window.location.href = 'https://au-temple-du-sushi-bouc-bel-air.order.app.hd.digital/menus'
  }

  function handleOrderClick() {
    window.open('https://au-temple-du-sushi-bouc-bel-air.order.app.hd.digital/menus', '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image src="/logo-sushi.png" alt="Au Temple du Sushi" width={60} height={60} className="object-contain" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#accueil" className="text-gray-700 hover:text-temple-pink transition-colors font-medium">
                Accueil
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-temple-pink transition-colors flex items-center font-medium">
                  Menus <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="#nos-menus"
                    className="block px-4 py-2 text-gray-700 hover:bg-temple-pink/10 hover:text-temple-pink font-medium"
                  >
                    Nos Menus
                  </Link>
                  <Link
                    href="#nos-creations"
                    className="block px-4 py-2 text-gray-700 hover:bg-temple-pink/10 hover:text-temple-pink font-medium"
                  >
                    Nos Créations
                  </Link>
                </div>
              </div>
              <Link
                href="#qui-sommes-nous"
                className="text-gray-700 hover:text-temple-pink transition-colors font-medium"
              >
                Qui sommes-nous ?
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              {/* <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-temple-pink hover:bg-temple-pink/90 text-black font-semibold relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Reserver
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
              </Dialog> */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section avec Vidéo */}
      <section
        id="accueil"
        ref={heroRef}
        className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted={isVideoMuted} playsInline>
          <source src="/hero3.webm?height=1080&width=1920" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />


        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <TypingAnimation className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-temple-pink bg-clip-text text-transparent">
              Le Sushi dans sa plus belle expression
            </TypingAnimation>
            <p className="text-xl md:text-2xl mb-8 text-white font-light">L'Art du Sushi, l'Âme du Japon.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-temple-pink hover:bg-temple-pink/90 text-black px-8 py-4 text-lg font-semibold"
                onClick={() => handleOrderClick()}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Commander maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent font-semibold"
                onClick={() => document.getElementById("nos-menus")?.scrollIntoView({ behavior: "smooth" })}
              >
                Découvrir nos menus
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Section Qui sommes-nous */}
      <section
        id="qui-sommes-nous"
        ref={aboutRef}
        className={`py-20 bg-white transition-all duration-1000 ease-in-out ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-800 ease-in-out ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Qui sommes-nous ?</h2>
              <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                Au Temple du Sushi, nous sommes passionnés par l'art culinaire japonais depuis plus de 10 ans. Notre
                chef, formé au Japon, apporte son expertise et sa créativité pour vous offrir une expérience
                gastronomique authentique.
              </p>
              <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                Situés au cœur de Bouc Bel Air, nous sélectionnons quotidiennement les meilleurs produits de la mer pour
                garantir fraîcheur et qualité. Chaque sushi est préparé avec soin, dans le respect des traditions
                japonaises.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={10} />+ </div>
                  <div className="text-sm text-gray-600 font-medium">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={1000} />+</div>
                  <div className="text-sm text-gray-600 font-medium">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={50} />+</div>
                  <div className="text-sm text-gray-600 font-medium">Créations uniques</div>
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-800 ease-in-out ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

              <Image
                src="/our.webp?height=500&width=600"
                alt="Notre chef au travail"
                width={600}
                height={500}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Menus avec Tabs */}
      <section
        id="nos-menus"
        ref={menusRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${menusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${menusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Menus</h2>
            <p className="text-xl text-gray-600 font-medium">
              Découvrez notre sélection pour déguster sur place ou à emporter
            </p>
          </div>

          <Tabs defaultValue="sur-place" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-white">
              <TabsTrigger
                value="sur-place"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Sur Place
              </TabsTrigger>
              <TabsTrigger
                value="a-emporter"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                À Emporter
              </TabsTrigger>
              <TabsTrigger
                value="livraisons"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Libre-service
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sur-place">
              {/* Image de présentation pour Sur Place */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src="/IMG_2746 2.jpeg"
                    alt="Intérieur du restaurant"
                    width={800}
                    height={300}
                    className="w-full h-full object-cover blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-bold mb-2">Savourez l'expérience complète</h3>
                      <p className="text-lg opacity-90">Dans notre cadre chaleureux et authentique</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[...menuSurPlace, 
                  {
                    category: "Rolls Spéciaux",
                    items: [
                      {
                        name: "Dragon Roll",
                        description: "Avocat, concombre, anguille grillée, sauce teriyaki",
                        price: 14,
                        image: "/final-img.png"
                      },
                      {
                        name: "Rainbow Roll",
                        description: "Saumon, thon, avocat sur california roll",
                        price: 16,
                        image: "/final-img.png"
                      },
                      {
                        name: "Spicy Tuna Roll",
                        description: "Thon épicé, mayo sriracha, graines de sésame",
                        price: 12,
                        image: "/final-img.png"
                      },
                      {
                        name: "Philadelphia Roll",
                        description: "Saumon fumé, fromage frais, concombre",
                        price: 13,
                        image: "/final-img.png"
                      }
                    ]
                  }
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`group transition-all duration-800 ease-in-out ${menusInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                      }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    {/* Header de catégorie avec design premium */}
                    <div className="relative mb-8">
                      <div className="bg-gradient-to-r from-temple-pink/5 via-temple-pink/10 to-temple-pink/5 rounded-2xl p-6 backdrop-blur-sm border border-temple-pink/20 group-hover:border-temple-pink/30 transition-all duration-300">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="h-1 w-8 bg-gradient-to-r from-transparent to-temple-pink rounded-full"></div>
                          <h3 className="text-2xl font-bold text-gray-900 text-center">
                            {category.category}
                          </h3>
                          <div className="h-1 w-8 bg-gradient-to-l from-transparent to-temple-pink rounded-full"></div>
                        </div>
                      </div>
                      {/* Decoration dots */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-temple-pink/20 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-temple-pink/30 rounded-full"></div>
                    </div>

                    {/* Items avec design cards premium */}
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <Card
                          key={itemIndex}
                          className={`group/item relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm hover:bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out ${menusInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            }`}
                          style={{ 
                            transitionDelay: `${600 + index * 200 + itemIndex * 100}ms`,
                            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {/* Gradient border effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/20 via-transparent to-temple-pink/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          
                          <CardContent className="relative p-5">
                            <div className="flex gap-4">
                              {/* Image du plat avec effet hover */}
                              <div className="flex-shrink-0 relative">
                                <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-temple-pink/10 group-hover/item:ring-temple-pink/30 transition-all duration-300">
                                  <Image
                                    src={item.image || "/final-img.png"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                {/* Glowing dot indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-temple-pink rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                              </div>

                              {/* Détails du plat */}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="text-lg font-bold text-gray-900 group-hover/item:text-temple-pink transition-colors duration-300">{item.name}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className="bg-gradient-to-r from-temple-pink/15 to-temple-pink/10 text-temple-pink font-bold border border-temple-pink/20 group-hover/item:from-temple-pink/25 group-hover/item:to-temple-pink/20 transition-all duration-300">
                                      {item.price}€
                                    </Badge>
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/item:scale-110"
                                      onClick={() => addToCart(item)}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="a-emporter">
              <div className="grid lg:grid-cols-1 gap-8">
                {menuAEmporter.map((category, index) => (
                  <div key={index} className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-temple-pink pb-2">
                      {category.category}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {category.items.map((item, itemIndex) => (
                        <Card key={itemIndex} className="hover:shadow-lg transition-all duration-300 ease-in-out">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              {/* Image du plat */}
                              <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image || "/final-img.png"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              {/* Détails du plat */}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className="bg-temple-pink/10 text-temple-pink font-semibold">
                                      {item.price}€
                                    </Badge>
                                    <Button
                                      size="sm"
                                      className="bg-temple-pink hover:bg-temple-pink/90 text-white"
                                      onClick={() => addToCart(item)}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-gray-600 font-medium">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="livraisons">
              {/* Image de présentation pour Libre-service */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src="/IMG_2746 2.jpeg"
                    alt="Service libre-service"
                    width={800}
                    height={300}
                    className="w-full h-full object-cover blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-bold mb-2">Service rapide et pratique</h3>
                      <p className="text-lg opacity-90">Récupérez votre commande à votre rythme</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[...menuSurPlace, 
                  {
                    category: "Rolls Spéciaux",
                    items: [
                      {
                        name: "Dragon Roll",
                        description: "Avocat, concombre, anguille grillée, sauce teriyaki",
                        price: 14,
                        image: "/final-img.png"
                      },
                      {
                        name: "Rainbow Roll",
                        description: "Saumon, thon, avocat sur california roll",
                        price: 16,
                        image: "/final-img.png"
                      },
                      {
                        name: "Spicy Tuna Roll",
                        description: "Thon épicé, mayo sriracha, graines de sésame",
                        price: 12,
                        image: "/final-img.png"
                      },
                      {
                        name: "Philadelphia Roll",
                        description: "Saumon fumé, fromage frais, concombre",
                        price: 13,
                        image: "/final-img.png"
                      }
                    ]
                  }
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`group transition-all duration-800 ease-in-out ${menusInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                      }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    {/* Header de catégorie avec design premium */}
                    <div className="relative mb-8">
                      <div className="bg-gradient-to-r from-temple-pink/5 via-temple-pink/10 to-temple-pink/5 rounded-2xl p-6 backdrop-blur-sm border border-temple-pink/20 group-hover:border-temple-pink/30 transition-all duration-300">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="h-1 w-8 bg-gradient-to-r from-transparent to-temple-pink rounded-full"></div>
                          <h3 className="text-2xl font-bold text-gray-900 text-center">
                            {category.category}
                          </h3>
                          <div className="h-1 w-8 bg-gradient-to-l from-transparent to-temple-pink rounded-full"></div>
                        </div>
                      </div>
                      {/* Decoration dots */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-temple-pink/20 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-temple-pink/30 rounded-full"></div>
                    </div>

                    {/* Items avec design cards premium */}
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <Card
                          key={itemIndex}
                          className={`group/item relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm hover:bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out ${menusInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            }`}
                          style={{ 
                            transitionDelay: `${600 + index * 200 + itemIndex * 100}ms`,
                            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {/* Gradient border effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/20 via-transparent to-temple-pink/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          
                          <CardContent className="relative p-5">
                            <div className="flex gap-4">
                              {/* Image du plat avec effet hover */}
                              <div className="flex-shrink-0 relative">
                                <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-temple-pink/10 group-hover/item:ring-temple-pink/30 transition-all duration-300">
                                  <Image
                                    src={item.image || "/final-img.png"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                {/* Glowing dot indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-temple-pink rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                              </div>

                              {/* Détails du plat */}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="text-lg font-bold text-gray-900 group-hover/item:text-temple-pink transition-colors duration-300">{item.name}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className="bg-gradient-to-r from-temple-pink/15 to-temple-pink/10 text-temple-pink font-bold border border-temple-pink/20 group-hover/item:from-temple-pink/25 group-hover/item:to-temple-pink/20 transition-all duration-300">
                                      {item.price}€
                                    </Badge>
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/item:scale-110"
                                      onClick={() => addToCart(item)}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Services Section */}
      <section
        ref={servicesRef}
        className={`py-20 bg-white transition-all duration-1000 ease-in-out ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Une Expérience Unique</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Découvrez notre univers où tradition japonaise et modernité se rencontrent pour vous offrir une expérience
              culinaire exceptionnelle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Fish,
                title: "Fraîcheur Garantie",
                description:
                  "Nos poissons sont sélectionnés quotidiennement pour vous garantir une fraîcheur irréprochable.",
              },
              {
                icon: Utensils,
                title: "Libre-Service",
                description:
                  "Découvrez notre frigo libre-service avec des plateaux préparés avec soin, prêts à déguster.",
              },
              {
                icon: Heart,
                title: "Tradition Authentique",
                description:
                  "Plongez dans l'authenticité de la culture japonaise à travers nos créations traditionnelles.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-temple-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-temple-pink/20 transition-colors duration-300 ease-in-out">
                    <service.icon className="w-8 h-8 text-temple-pink" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 font-medium">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Nos Créations avec Images */}
      <section
        id="nos-creations"
        ref={creationsRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${creationsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${creationsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Créations</h2>
            <p className="text-xl text-gray-600 font-medium">
              Découvrez l'art culinaire japonais à travers nos créations uniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creations.map((creation, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 ${creationsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={creation.image || "/final-img.png"}
                    alt={creation.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold">{creation.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <NosCreations />
      </section>

      {/* Reviews Section */}
      <section
        ref={reviewsRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${reviewsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${reviewsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>

            <p className="text-xl text-gray-600 mb-8 font-medium">Vos avis sont notre plus belle récompense. Découvrez pourquoi ils nous aiment !</p>
            <ReviewMarquee />
            <div className="mt-12 text-center animate-fade-in-up delay-300">

              <GoogleReviewsCard />

            </div>
          </div>

        </div>
      </section>

      {/* Instagram Section */}
      <section
        ref={instagramRef}
        className={`py-10 bg-gray-50 transition-all duration-1000 ease-in-out ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Suivez-nous sur Instagram</h2>
            
            {/* Avatar circulaire avec username */}
            <div className={`flex flex-col items-center mb-8 transition-all duration-1000 ease-in-out delay-300 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative mb-4">
                {/* Bordure gradient Instagram */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/logo-sushi.png?height=50&width=50"
                        alt="Au Temple du Sushi Avatar"
                        width={50}
                        height={50}
                        className="w-full  h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-800 font-semibold mb-2">@autempledusushi__</p>
            </div>

            {/* Statistiques Instagram animées */}
            <div className={`flex justify-center items-center gap-8 mb-8 transition-all duration-1000 ease-in-out delay-400 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl font-bold text-gray-900 mb-1 transition-all duration-700 ease-out ${instagramInView ? "transform scale-100" : "transform scale-75"}`}
                    style={{ transitionDelay: '500ms' }}>
                    615
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">publications</div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-temple-pink transition-all duration-500 ease-out group-hover:w-full"></div>
                </div>
              </div>

              <div className="w-px h-12 bg-gray-300"></div>

              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl font-bold text-gray-900 mb-1 transition-all duration-700 ease-out ${instagramInView ? "transform scale-100" : "transform scale-75"}`}
                    style={{ transitionDelay: '600ms' }}>
                    12.4K
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">abonnés</div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-temple-pink transition-all duration-500 ease-out group-hover:w-full"></div>
                </div>
              </div>

              <div className="w-px h-12 bg-gray-300"></div>

              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl font-bold text-gray-900 mb-1 transition-all duration-700 ease-out ${instagramInView ? "transform scale-100" : "transform scale-75"}`}
                    style={{ transitionDelay: '700ms' }}>
                    386
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">abonnements</div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-temple-pink transition-all duration-500 ease-out group-hover:w-full"></div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className={`border-temple-pink text-temple-pink hover:bg-temple-pink/10 bg-transparent transition-all duration-300 ease-in-out hover:scale-105 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: '800ms' }}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Suivre
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['img0.jpeg', 'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg'].map((img, index) => (
              <div
                key={index}
                className={`aspect-square relative group overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <Image
                  src={`/${img}?height=300&width=300&query=beautiful+sushi+platter+${index + 1}`}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Contact Section */}

      <section
        ref={contactRef}
        className={`relative py-20 bg-gray-900 text-white overflow-hidden transition-all duration-1000 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-temple-pink bg-clip-text text-transparent">
              Restons en Contact
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une question, une réservation ou simplement envie de nous dire bonjour ?
              Nous sommes là pour vous accompagner dans votre expérience culinaire.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Form */}
            <div className={`transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-temple-pink/20 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-temple-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">Envoyez-nous un message</h3>
                </div>

                <form className="space-y-6 flex-grow">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <Input
                        placeholder="Votre nom"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder="Votre email"
                        type="email"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative group">
                    <Input
                      placeholder="Sujet"
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <div className="relative group">
                    <Textarea
                      placeholder="Votre message..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500 resize-none"
                      rows={5}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <Button className="w-full h-14 bg-gradient-to-r from-temple-pink to-pink-400 hover:from-pink-400 hover:to-temple-pink text-gray-900 font-bold text-lg rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-temple-pink/30 transform">
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className={`space-y-6 transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "400ms" }}>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Notre Adresse",
                    content: "Centre Commercial San Baquis\nBouc Bel Air",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "bg-blue-500/20"
                  },
                  {
                    icon: Phone,
                    title: "Téléphone",
                    content: "06 61 38 75 45",
                    color: "from-green-500 to-green-600",
                    bgColor: "bg-green-500/20"
                  },
                  {
                    icon: Clock,
                    title: "Nos Horaires",
                    content: "Lun - Sam: 11h00 - 22h00\nDimanche: 11h00 - 21h00",
                    color: "from-orange-500 to-orange-600",
                    bgColor: "bg-orange-500/20"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-6 h-6 text-temple-pink`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Section */}
              <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "1050ms" }}>
                <h3 className="text-xl font-bold mb-4 text-center">Suivez-nous sur les réseaux sociaux</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="https://www.facebook.com/share/19UwPk6Ejc/?mibextid=wwXIfr" className="group p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </a>
                  <a href="https://www.instagram.com/autempledusushi__/" className="group p-3 bg-pink-600/20 hover:bg-pink-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
                  </a>
                  <a href="https://www.tiktok.com/@au.temple.du.sushi?_t=ZN-8yW8HFTq4ta&_r=1" className="group p-3 bg-gray-900 hover:bg-gray-900/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                  <a href="https://g.co/kgs/uvnoQDs" className="group p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center">
                    <Image src="/google.svg" alt="google" width={26} height={26} className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                  </a>
                </div>
                <p className="text-center text-gray-400 text-sm mt-3">
                  Facebook • Instagram • Tiktok • Google Business
                </p>
              </div>
            </div>
          </div>
          {/* Google Maps - Full Width Below */}
          <div
            className={`mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 transition-all duration-800 ease-in-out hover:border-gray-600/50 ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1200ms" }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Nous Trouver</h3>
            </div>
            <div className="rounded-xl overflow-hidden h-80 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.8!2d5.4!3d43.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDI0JzAwLjAiTiA1wrAyNCcwMC4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Au Temple du Sushi"
                className="transition-all duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-temple-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
            </div>
          </div>

          {/* Bottom CTA */}

        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo-sushi.png"
                  alt="Au Temple du Sushi"
                  width={40}
                  height={40}
                  className="object-contain filter brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">AU TEMPLE</span>
                  <span className="text-sm font-bold text-temple-pink leading-tight">DU SUSHI</span>
                </div>
              </div>
              <p className="text-gray-400 font-medium">L'authenticité japonaise au cœur de Bouc Bel Air</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#accueil" className="hover:text-temple-pink transition-colors font-medium">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="#nos-menus" className="hover:text-temple-pink transition-colors font-medium">
                    Nos Menus
                  </Link>
                </li>
                <li>
                  <Link href="#qui-sommes-nous" className="hover:text-temple-pink transition-colors font-medium">
                    Qui sommes-nous
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400 font-medium">
                <li>Sur place</li>
                <li>À emporter</li>
                <li>Libre-service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Localisation</h3>
              <div className="text-gray-400 font-medium mb-4">
                <p>Centre Commercial San Baquis</p>
                <p>13320 Bouc Bel Air</p>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-temple-pink transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="font-medium">&copy; {new Date().getFullYear()} Au Temple du Sushi. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Commande */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-temple-pink">Votre Commande</DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Liste des plats */}
            <div>
              <h3 className="text-xl font-bold mb-4">Nos Plats</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {[...menuSurPlace, ...menuAEmporter].map((category) =>
                  category.items.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="font-bold text-temple-pink">{item.price}€</p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-temple-pink hover:bg-temple-pink/90"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )),
                )}
              </div>
            </div>

            {/* Panier et formulaire */}
            <div>
              <h3 className="text-xl font-bold mb-4">Votre Panier</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 mb-6">Votre panier est vide</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.price}€ x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-temple-pink">{getTotalPrice()}€</span>
                    </div>
                  </div>
                </div>
              )}

              {cart.length > 0 && (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  {/* <Input
                    placeholder="Nom complet"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Téléphone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Adresse de livraison"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Notes spéciales (optionnel)"
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                  /> */}
                  <Button asChild className="w-full bg-temple-pink text-black hover:bg-temple-pink/90 font-semibold">
                    <Link href="tel:+33661387545">
                      <Phone className="w-5 h-5 mr-2" />
                      Contactez le restaurant
                    </Link>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="bg-temple-pink hover:bg-temple-pink/90 text-black  text-md shadow-lg rounded-full px-6 py-3 font-semibold relative"
          onClick={() => setIsOrderModalOpen(true)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Reserver
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}