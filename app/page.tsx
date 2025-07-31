"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReviewMarquee } from "@/components/review"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { ShineBorder } from "@/components/magicui/shine-border"
import dynamic from "next/dynamic"

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
    // Ici vous pourriez envoyer la commande à votre backend
    alert("Commande envoyée avec succès !")
    setCart([])
    setIsOrderModalOpen(false)
    setOrderForm({ name: "", email: "", phone: "", address: "", notes: "" })
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
              <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-temple-pink hover:bg-temple-pink/90 text-black font-semibold relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Commander
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button
                variant="outline"
                size="icon"
                className="border-temple-pink text-temple-pink hover:bg-temple-pink/10 bg-transparent"
              >
                <User className="w-4 h-4" />
              </Button>
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
                onClick={() => setIsOrderModalOpen(true)}
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
                    <NumberTicker className="text-temple-pink" value={10}/>+ </div>
                  <div className="text-sm text-gray-600 font-medium">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={1000}/>+</div>
                  <div className="text-sm text-gray-600 font-medium">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={50}/>+</div>
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
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-white">
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
            </TabsList>

            <TabsContent value="sur-place">
              {/* Image de présentation pour Sur Place */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64 ">
                  <Image
                    src="/IMG_2746 2.jpeg"
                    alt="Intérieur du restaurant"
                    width={800}
                    height={300}
                    className="w-full h-full object-cover blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <Meteors number={10} /> */}
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-bold mb-2">Savourez l'expérience complète</h3>
                      <p className="text-lg opacity-90">Dans notre cadre chaleureux et authentique</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {menuSurPlace.map((category, index) => (
                  <div
                    key={index}
                    className={`space-y-6 transition-all duration-800 ease-in-out ${menusInView
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${index % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
                      }`}
                    style={{ transitionDelay: `${400 + index * 300}ms` }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-temple-pink pb-2">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <Card
                          key={itemIndex}
                          className={`hover:shadow-md transition-all duration-300 ease-in-out ${menusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                          style={{ transitionDelay: `${600 + index * 300 + itemIndex * 100}ms` }}
                        >
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
                            <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={item.image || "/final-img.png"}
                                alt={item.name}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                            </div>
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

              <Button
                asChild
                variant="outline"
                className="border-temple-pink text-temple-pink hover:bg-temple-pink/10 bg-transparent transition-all duration-300 ease-in-out hover:scale-105 font-semibold"
              >
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Au+temple+du+sushi+Bouc+Bel+Air"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir tous les avis Google
                </Link>
              </Button>

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Suivez-nous sur Instagram</h2>
            <p className="text-xl text-gray-600 mb-8 font-medium">@autempledusushi__</p>
            <Button
              variant="outline"
              className="border-temple-pink text-temple-pink hover:bg-temple-pink/10 bg-transparent transition-all duration-300 ease-in-out hover:scale-105 font-semibold"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Suivre
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`aspect-square relative group overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <Image
                  src={`/img0.jpeg?height=300&width=300&query=beautiful+sushi+platter+${index + 1}`}
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
        className={`py-20 bg-gray-900 text-white transition-all duration-1000 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2 className="text-4xl font-bold mb-8">Contactez-nous</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Votre nom"
                    className="bg-gray-800 border-gray-700 text-white transition-all duration-300 ease-in-out focus:scale-105 font-medium"
                  />
                  <Input
                    placeholder="Votre email"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white transition-all duration-300 ease-in-out focus:scale-105 font-medium"
                  />
                </div>
                <Textarea
                  placeholder="Votre message"
                  className="bg-gray-800 border-gray-700 text-white transition-all duration-300 ease-in-out focus:scale-105 font-medium"
                  rows={4}
                />
                <Button className="w-full bg-temple-pink hover:bg-temple-pink/90 transition-all duration-300 ease-in-out hover:scale-105 font-semibold">
                  Envoyer le message
                </Button>
              </form>
            </div>

            <div
              className={`transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h2 className="text-4xl font-bold mb-8">Nous Trouver</h2>
              <div className="space-y-6 mb-8">
                {[
                  { icon: MapPin, title: "Adresse", content: "Centre Commercial San Baquis\nBouc Bel Air" },
                  { icon: Phone, title: "Téléphone", content: "04 XX XX XX XX" },
                  { icon: Clock, title: "Horaires", content: "Lun - Sam: 11h00 - 22h00\nDimanche: 11h00 - 21h00" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-500 ease-in-out ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <item.icon className="w-6 h-6 text-temple-pink mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-300 whitespace-pre-line font-medium">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps */}
              <div className="rounded-lg overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.8!2d5.4!3d43.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDI0JzAwLjAiTiA1wrAyNCcwMC4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Au Temple du Sushi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
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
                  <Input
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
                  />
                  <Button type="submit" className="w-full bg-temple-pink hover:bg-temple-pink/90 font-semibold">
                    Confirmer la commande - {getTotalPrice()}€
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
          className="bg-temple-pink hover:bg-temple-pink/90 text-white shadow-lg rounded-full px-6 py-3 font-semibold relative"
          onClick={() => setIsOrderModalOpen(true)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Commander
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