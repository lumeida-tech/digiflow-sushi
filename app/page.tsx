"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Truck } from 'lucide-react'
import { MapPin, Phone, Clock, Star, Instagram, ShoppingCart, User, MenuIcon, X, ChevronDown, Heart, Utensils, Fish, Play, Pause, Volume2, VolumeX, Plus, Minus, UtensilsCrossed, ShoppingBag, Navigation, Send, Mail, Facebook, Youtube, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { ShineBorder } from "@/components/magicui/shine-border"
import dynamic from "next/dynamic"
import LanguageSwitcher from "@/components/language-switcher"
import GoogleReviewsCard from "@/components/google-review-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import { AboutImages } from "@/components/about-images"
import InstagramFeed from "@/components/instagram-feed"
import GoogleReviews from "@/components/google-reviews"
import React from "react"

const NosCreations = dynamic(
  () => import('../components/our-creation-section'),
  { ssr: false }
)
const ReviewMarquee = dynamic(() => import('@/components/review'), {
  ssr: false
});

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

// Mobile Menu Component
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Menu</h2>
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-8 h-8 text-gray-700" />
        </Button>
      </div>
      <nav className="flex flex-col px-6 py-4 space-y-8 text-xl font-medium text-gray-800">
        <Link href="#accueil" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          Accueil
        </Link>
        <div className="relative group">
          <button className="hover:text-temple-pink transition-colors flex items-center">
            Menus <ChevronDown className="w-6 h-6 ml-2" />
          </button>
          <div className="flex flex-col mt-4 space-y-4 text-xl font-medium text-gray-600">
            <Link href="#nos-menus" className="hover:text-temple-pink transition-colors" onClick={onClose}>
              Nos Menus
            </Link>
            <Link href="#nos-creations" className="hover:text-temple-pink transition-colors" onClick={onClose}>
              Nos Créations
            </Link>
          </div>
        </div>
        <Link href="#qui-sommes-nous" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          Qui sommes-nous ?
        </Link>
        <Link href="#contact" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          Contact
        </Link>
      </nav>
    </div>
  );
}

export default function Home() {
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
      category: "Boissons avec Alcool",
      items: [
        {
          id: "whisky-coca",
          name: "Whisky Coca",
          description: "4cl - Whisky premium avec coca cola",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "whisky-label",
          name: "Whisky Label",
          description: "4cl - Johnnie Walker Red Label",
          price: 4.80,
          image: "/final-img.png"
        },
        {
          id: "whisky-yamazakura",
          name: "Whisky Yamazakura",
          description: "4cl - Whisky japonais premium",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "whisky-togouchi",
          name: "Whisky Togouchi",
          description: "4cl - Whisky japonais artisanal",
          price: 9.00,
          image: "/final-img.png"
        },
        {
          id: "pastis",
          name: "Pastis",
          description: "2cl - Pastis traditionnel",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "shochu",
          name: "Shochu",
          description: "2cl - Alcool de riz japonais",
          price: 6.00,
          image: "/final-img.png"
        },
      ]
    },
    {
      category: "Bières",
      items: [
        {
          id: "asashi-biere-blond",
          name: "Asashi Bière Blond",
          description: "33cl - Bière japonaise légère",
          price: 4.20,
          image: "/final-img.png"
        },
        {
          id: "kirin-biere-blonde",
          name: "Kirin Bière Blonde",
          description: "33cl - Bière japonaise premium",
          price: 4.20,
          image: "/final-img.png"
        },
        {
          id: "pietra-biere-ambree",
          name: "Pietra Bière Ambrée",
          description: "33cl - Bière corse aux châtaignes",
          price: 4.50,
          image: "/final-img.png"
        },
        {
          id: "desperados-blonde",
          name: "Desperados Blonde",
          description: "33cl - Bière aromatisée tequila",
          price: 5.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Cocktails du Temple",
      items: [
        {
          id: "cocktail-peche",
          name: "Cocktail Pêche",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "cocktail-fraise",
          name: "Cocktail Fraise",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "cocktail-citron",
          name: "Cocktail Citron",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Boissons Sans Alcool",
      items: [
        {
          id: "eau-minerale",
          name: "Eau Minérale",
          description: "1l - Eau plate",
          price: 5.00,
          image: "/final-img.png"
        },
        {
          id: "eau-petillante",
          name: "Eau Pétillante",
          description: "1l - Eau gazeuse",
          price: 5.50,
          image: "/final-img.png"
        },
        {
          id: "sirop-menthe",
          name: "Sirop Menthe",
          description: "25cl - Sirop à la menthe fraîche",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "sirop-fraise",
          name: "Sirop Fraise",
          description: "25cl - Sirop à la fraise",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "oasis",
          name: "Oasis",
          description: "33cl - Boisson aux fruits tropicaux",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "coca-cola",
          name: "Coca Cola",
          description: "25cl - Cola classique",
          price: 3.00,
          image: "/final-img.png"
        },
        {
          id: "coca-cola-zero",
          name: "Coca Cola Zero",
          description: "25cl - Cola sans sucre",
          price: 3.00,
          image: "/final-img.png"
        },
        {
          id: "cafe",
          name: "Café",
          description: "Expresso traditionnel",
          price: 3.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Thés Japonais",
      items: [
        {
          id: "limonade-japonaise",
          name: "Limonade Japonaise",
          description: "200ml - Boisson pétillante au yuzu",
          price: 3.90,
          image: "/final-img.png"
        },
        {
          id: "goyave-litchi",
          name: "Goyave Litchi",
          description: "25cl - Thé glacé exotique",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-gingembre",
          name: "Thé Jomo Gingembre",
          description: "350ml - Thé vert au gingembre",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-mangue",
          name: "Thé Jomo Mangue",
          description: "350ml - Thé vert à la mangue",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-passion-citron-vert",
          name: "Thé Jomo Passion Citron Vert",
          description: "350ml - Thé vert passion citron",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-peche",
          name: "Thé Jomo Pêche",
          description: "350ml - Thé vert à la pêche",
          price: 3.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Cocktails Sans Alcool",
      items: [
        {
          id: "le-kimino-yuzu",
          name: "Le Kimino Yuzu",
          description: "Zeste de yuzu, gingembre, feuille de menthe",
          price: 9.00,
          image: "/final-img.png"
        },
        {
          id: "le-kimino-poire",
          name: "Le Kimino Poire",
          description: "Zeste de yuzu, poire, feuille de menthe",
          price: 9.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Boeuf Wagyu Grade A5, importé du Japon",
      items: [
        {
          id: "sashimi-de-boeuf",
          name: "Sashimi de boeuf",
          description: "Patates douces pané sur son lit de sauce truffé",
          price: 68.00,
          image: "/final-img.png"
        },
        {
          id: "nigiri-boeuf-wagyu-sauce-truffe",
          name: "Nigiri boeuf wagyu sauce truffe",
          description: "Feuille d'or (à l'unité)",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "nigiri-boeuf-wagyu",
          name: "Nigiri boeuf wagyu",
          description: "À l'unité",
          price: 6.00,
          image: "/final-img.png"
        },
        {
          id: "sashimi-de-boeuf-wagyu",
          name: "Sashimi de boeuf wagyu",
          description: "100G",
          price: 58.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nos plats chaud",
      items: [
        {
          id: "yakitori-poulet-caramelise",
          name: "Yakitori poulet caramélisé",
          description: "Accompagné de riz vinaigré (X5)",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poulet-karaage-sauce-cocktail",
          name: "Poulet karaage sauce cocktail",
          description: "(x5)",
          price: 8.20,
          image: "/final-img.png"
        },
        {
          id: "poulet-teriyaki",
          name: "Poulet teriyaki",
          description: "Accompagné de riz vinaigré",
          price: 13.60,
          image: "/final-img.png"
        },
        {
          id: "katsu-tori",
          name: "Katsu tori (poulet frit)",
          description: "Accompagné de riz vinaigré",
          price: 12.60,
          image: "/final-img.png"
        },
        {
          id: "kare-raisu-curry-japonais-riz-poulet",
          name: "Kare raisu (curry japonais)",
          description: "Riz, poulet, pomme grenaille tomate",
          price: 17.50,
          image: "/final-img.png"
        },
        {
          id: "kare-raisu-curry-japonais-riz-saucisse",
          name: "Kare raisu (curry japonais)",
          description: "Riz, saucisse, pomme grenaille tomate",
          price: 17.30,
          image: "/final-img.png"
        },
        {
          id: "bun-bao-legumes-gingembre",
          name: "Bun bao légumes, gingembre",
          description: "2pcs",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "bun-bao-champignon-teriyaki",
          name: "Bun bao champignon, teriyaki",
          description: "2pcs",
          price: 8.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Ramen",
      items: [
        {
          id: "ramen-karaage",
          name: "Ramen karaage",
          description: "Nouilles fraîche, bouillon miso, pousse de bambou, chou, edamame carotte, champignon poulet karaage",
          price: 20.80,
          image: "/final-img.png"
        },
        {
          id: "ramen-chashu",
          name: "Ramen chashu",
          description: "Nouilles fraîches, tranches de chashu (porc), pousse de bambou, bouillon miso, maïs, tomate, champignon, chou, algue nori",
          price: 22.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nouilles",
      items: [
        {
          id: "nouilles-legumes",
          name: "Nouilles légumes",
          description: "Nouilles fraîches confectionnée par une fabrique de pâte local",
          price: 17.00,
          image: "/final-img.png"
        },
        {
          id: "nouilles-crevettes-legumes",
          name: "Nouilles crevettes, légumes",
          description: "",
          price: 18.80,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-teriyaki-legumes",
          name: "Nouilles poulet teriyaki, légumes",
          description: "",
          price: 17.30,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-caramelise-legumes",
          name: "Nouilles poulet caramélisé, légumes",
          description: "",
          price: 19.80,
          image: "/final-img.png"
        },
        {
          id: "nouille-saucisse-de-porc-japonaise-legumes",
          name: "Nouille saucisse de porc japonaise, légumes",
          description: "",
          price: 18.50,
          image: "/final-img.png"
        }
      ]
    }
  ];
  const menuLivraisons = menuSurPlace // This was already defined as menuSurPlace, keeping it for consistency
  const menuAEmporter = [
    {
      category: "Formules du Midi",
      items: [
        {
          id: "formule-a",
          name: "Formule A",
          description: "Entrée au choix offerte : soupe miso ou riz vinaigré ou salade edamame ou salade wakame + 6 California saumon avocat + 6 Flocon saumon + 6 Makis saumon + 1 Sushi saumon",
          price: 21.00,
          image: "/final-img.png"
        },
        {
          id: "formule-b",
          name: "Formule B",
          description: "6 California saumon avocat tobiko + 6 California saumon cheese + 1 Sushi saumon + 1 Dessert du jour au choix + Boisson soft au choix",
          price: 18.00,
          image: "/final-img.png"
        },
        {
          id: "formule-c",
          name: "Formule C",
          description: "Poke bowl au choix + 1 Dessert du jour + 1 Boisson soft au choix",
          price: 19.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Plateaux",
      items: [
        {
          id: "box-sushi-mix",
          name: "Box Sushi Mix",
          description: "12 pièces : 2 sushi saumon, 2 sushi thon, 1 sushi saumon braisé, 1 sushi thon braisé, 1 sushi saumon avocat jalapeno, 1 sushi saumon ciboulette, 1 sushi saumon tobiko, 1 sushi saumon spicy tobiko, 1 sushi saumon avocat, 1 sushi saumon mangue",
          price: 25.50,
          image: "/final-img.png"
        },
        {
          id: "box-sushi-duo",
          name: "Box Sushi Duo",
          description: "20 pièces : 10 sushi saumon, 10 sushi thon",
          price: 45.00,
          image: "/final-img.png"
        },
        {
          id: "box-sushi-saumon",
          name: "Box Sushi Saumon",
          description: "10 pièces : 10 sushi saumon",
          price: 20.50,
          image: "/final-img.png"
        },
        {
          id: "love-box",
          name: "Love Box",
          description: "24 pièces : 6 makis cheese, 6 California gambas cheese, 6 flocon saumon, 6 rolls saumon",
          price: 25.50,
          image: "/final-img.png"
        },
        {
          id: "calibox",
          name: "Calibox",
          description: "30 pièces : 3 California saumon avocat, 3 California saumon avocat tobiko, 6 flocon saumon cheese, 6 makis thon avocat, 6 makis concombre cheese, 6 calispring thon cuit mayonnaise",
          price: 30.50,
          image: "/final-img.png"
        },
        {
          id: "plateaux-chaud",
          name: "Plateaux Chaud",
          description: "26 pièces : samoussa boeuf, samoussa poulet, gyoza porc, gyoza poulet curry, nem légume, crevette tempura, nem crevette, karaage",
          price: 35.00,
          image: "/final-img.png"
        },
        {
          id: "family-box",
          name: "Family Box",
          description: "46 pièces : 6 makis saumon, 6 makis thon, 6 California saumon avocat sésame, 6 rolls avocat concombre enrobé de mangue et saumon, 6 rolls avocat cheese, 6 flocon saumon cheese, 2 sushi saumon, 2 sushi thon, 3 sashimi saumon, 3 sashimi thon",
          price: 60.50,
          image: "/final-img.png"
        },
        {
          id: "chicken-box",
          name: "Chicken Box",
          description: "24 pièces : 6 calispring poulet frit avocat cheese, 6 California poulet frit cheddar oignon frit, 6 makis poulet curry, 6 makis poulet cheese",
          price: 24.00,
          image: "/final-img.png"
        },
        {
          id: "super-box",
          name: "Super Box",
          description: "14 pièces : 6 makis saumon cheese, 6 makis thon, 1 sushi saumon avocat, 1 sushi saumon braisé",
          price: 16.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-california",
          name: "Plateau California",
          description: "18 pièces : 3 saumon avocat, 3 saumon avocat tobiko, 3 saumon cheese, 3 crevette tempura mayo, 3 saumon mangue menthe, 3 thon avocat",
          price: 18.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-makis",
          name: "Plateau Makis",
          description: "18 pièces : 3 saumon, 3 thon, 3 avocat, 3 concombre cheese, 3 cheese, 3 avocat mayo",
          price: 15.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-premium",
          name: "Plateau Premium",
          description: "60 pièces : 6 rolls avocat enrobé de saumon braisé sauce truffe, 6 California crevette tempura mayo, 2 sushi saumon, 2 sushi thon, 6 rolls saumon, 6 flocon saumon avocat, 4 sashimi thon, 4 sashimi saumon, 6 makis thon cru cheese, 6 California gambas cheese oignon frit, 6 rolls saumon braisé avocat sauce spicy bille citronnée, 6 California saumon avocat",
          price: 84.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Poke Bowl sur lit de riz",
      items: [
        {
          id: "poke-bowl-01",
          name: "Poke Bowl N°01",
          description: "Salade wakame, carotte, avocat, maïs, edamame, mangue, billes citronnées",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-02",
          name: "Poke Bowl N°02",
          description: "Poulet curry, mangue, avocat, carotte",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-03",
          name: "Poke Bowl N°03",
          description: "Poulet caramélisé, mangue, avocat, saumon",
          price: 13.40,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-04",
          name: "Poke Bowl N°04",
          description: "Poulet, tomate, chou, carotte, grenade",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-05",
          name: "Poke Bowl N°05",
          description: "Gambas, avocat, carotte, chou, mangue",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-06",
          name: "Poke Bowl N°06",
          description: "Saumon, avocat, mangue, concombre, edamame",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-07",
          name: "Poke Bowl N°07",
          description: "Poulet karaage, avocat, chou, edamame",
          price: 12.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-08",
          name: "Poke Bowl N°08",
          description: "Poulet frit, maïs, mangue, concombre, edamame, oignon frit",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-09",
          name: "Poke Bowl N°09",
          description: "Poulet teriyaki, saumon, avocat, mangue, edamame",
          price: 13.90,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-10",
          name: "Poke Bowl N°10",
          description: "Thon cuit, avocat, edamame, tomate, maïs",
          price: 13.50,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-11",
          name: "Poke Bowl N°11",
          description: "Saumon cuit, grenade, carotte, chou, edamame, billes citronnées",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-12",
          name: "Poke Bowl N°12",
          description: "Thon, avocat, mangue, concombre, edamame",
          price: 13.40,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Plats Chauds",
      items: [
        {
          id: "samoussa-poulet",
          name: "Samoussa Poulet",
          description: "X5",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "samoussa-boeuf",
          name: "Samoussa Boeuf",
          description: "X5",
          price: 7.50,
          image: "/final-img.png"
        },
        {
          id: "yakitori-poulet-caramelise-takeaway",
          name: "Yakitori Poulet Caramélisé",
          description: "Accompagné de riz vinaigré (X5)",
          price: 10.90,
          image: "/final-img.png"
        },
        {
          id: "nem-poulet",
          name: "Nem Poulet",
          description: "X5",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "nem-crevettes",
          name: "Nem Crevettes",
          description: "X5",
          price: 7.30,
          image: "/final-img.png"
        },
        {
          id: "nem-legumes",
          name: "Nem Légumes",
          description: "X5",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "crevettes-tempura",
          name: "Crevettes Tempura",
          description: "X4",
          price: 7.70,
          image: "/final-img.png"
        },
        {
          id: "poulet-karaage-sauce-cocktail-takeaway",
          name: "Poulet Karaage Sauce Cocktail",
          description: "X5",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "gyoza-poulet-curry",
          name: "Gyoza Poulet Curry",
          description: "X5",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "gyoza-crevette",
          name: "Gyoza Crevette",
          description: "X5",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "gyoza-porc",
          name: "Gyoza Porc",
          description: "X5",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "nouilles-legumes-takeaway",
          name: "Nouilles Légumes",
          description: "",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "nouilles-crevettes-et-legumes",
          name: "Nouilles Crevettes et Légumes",
          description: "",
          price: 14.40,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-teriyaki-et-legumes",
          name: "Nouilles Poulet Teriyaki et Légumes",
          description: "",
          price: 13.90,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-caramelise-et-legumes",
          name: "Nouilles Poulet Caramélisé et Légumes",
          description: "",
          price: 13.80,
          image: "/final-img.png"
        },
        {
          id: "poulet-teriyaki-takeaway",
          name: "Poulet Teriyaki",
          description: "Accompagné de riz vinaigré",
          price: 11.30,
          image: "/final-img.png"
        },
        {
          id: "poulet-frit",
          name: "Poulet Frit",
          description: "Accompagné de riz vinaigré",
          price: 10.50,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu",
          name: "Soupe Miso Tofu",
          description: "",
          price: 4.60,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu-wakame-ciboulette",
          name: "Soupe Miso Tofu, Wakame, Ciboulette",
          description: "",
          price: 4.80,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu-algue-seche-edamame",
          name: "Soupe Miso Tofu, Algue Séché, Edamame",
          price: 4.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Makis par 6",
      items: [
        {
          id: "makis-saumon",
          name: "Saumon",
          description: "",
          price: 5.80,
          image: "/final-img.png"
        },
        {
          id: "makis-saumon-cheese",
          name: "Saumon, Cheese",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-mayonnaise",
          name: "Thon, Mayonnaise",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-avocat",
          name: "Thon, Avocat",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-mayonnaise",
          name: "Poulet, Mayonnaise",
          description: "",
          price: 5.50,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-cheese",
          name: "Poulet, Cheese",
          description: "",
          price: 5.40,
          image: "/final-img.png"
        },
        {
          id: "makis-concombre-cheese",
          name: "Concombre, Cheese",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-curry",
          name: "Poulet Curry",
          description: "",
          price: 5.40,
          image: "/final-img.png"
        },
        {
          id: "makis-cheese",
          name: "Cheese",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-gambas",
          name: "Gambas",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "makis-thon",
          name: "Thon",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-cheese",
          name: "Thon, Cheese",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "makis-avocat",
          name: "Avocat",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-avocat-mayo",
          name: "Avocat, Mayo",
          description: "",
          price: 5.10,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "California par 6",
      items: [
        {
          id: "california-saumon-avocat",
          name: "Saumon, Avocat",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-avocat-tobiko",
          name: "Saumon, Avocat, Tobiko",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese",
          name: "Gambas, Cheese",
          description: "",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-cheese",
          name: "Poulet, Cheese",
          description: "",
          price: 5.90,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese-avocat",
          name: "Gambas, Cheese, Avocat",
          description: "",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-avocat",
          name: "Poulet, Avocat",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-curry",
          name: "Poulet Curry",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-frit-cheddar-oignon-frit",
          name: "Poulet Frit, Cheddar, Oignon Frit",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "california-thon-avocat",
          name: "Thon, Avocat",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-mayo",
          name: "Crevette Tempura, Mayo",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-avocat",
          name: "Crevette Tempura, Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese-oignon-frit",
          name: "Gambas, Cheese, Oignon Frit",
          description: "",
          price: 7.70,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-mangue-menthe",
          name: "Saumon, Mangue, Menthe",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 6.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Sushi à l'unité",
      items: [
        {
          id: "sushi-saumon",
          name: "Saumon",
          description: "",
          price: 2.20,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-thon",
          name: "Thon",
          description: "",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-ciboulette",
          name: "Saumon Ciboulette",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise",
          name: "Saumon Braisé",
          description: "",
          price: 2.40,
          image: "/final-img.png"
        },
        {
          id: "sushi-thon-braise",
          name: "Thon Braisé",
          description: "",
          price: 2.60,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise-sauce-spicy-tobiko",
          name: "Saumon Braisé, Sauce Spicy, Tobiko",
          description: "",
          price: 2.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-tobiko",
          name: "Saumon, Tobiko",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-mangue",
          name: "Saumon Mangue",
          description: "",
          price: 2.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise-truffe",
          name: "Saumon Braisé, Truffe",
          description: "",
          price: 3.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-avocat-jalapeno",
          name: "Saumon Avocat Jalapeno",
          description: "",
          price: 2.40,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Sashimi par 6",
      items: [
        {
          id: "sashimi-saumon",
          name: "Saumon",
          description: "",
          price: 9.30,
          image: "/final-img.png"
        },
        {
          id: "sashimi-thon",
          name: "Thon",
          description: "",
          price: 10.90,
          image: "/final-img.png"
        },
        {
          id: "sashimi-duo",
          name: "Duo",
          description: "4 Saumon - 4 Thon",
          price: 11.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Créations du Chef par 6",
      items: [
        {
          id: "rolls-saumon-braise-avocat-sauce-spicy-billes-citronnees",
          name: "Rolls Saumon Braisé, Avocat, Sauce Spicy, Billes Citronnées",
          description: "",
          price: 8.80,
          image: "/final-img.png"
        },
        {
          id: "l-italien",
          name: "L'Italien",
          description: "Tomate, Mozza, Parmesan, Pesto",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-avocat-enrobe-de-saumon-braise-oignon-frit",
          name: "California Crevette Tempura, Avocat, Enrobé de Saumon Braisé, Oignon Frit",
          description: "",
          price: 8.90,
          image: "/final-img.png"
        },
        {
          id: "avocat-mayo-enrobe-de-thon-braise-pousse-de-cress",
          name: "Avocat Mayo Enrobé de Thon Braisé, Pousse de Cress",
          description: "",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-caramelise-enrobe-de-mangue-tobiko",
          name: "California Poulet Caramélisé Enrobé de Mangue, Tobiko",
          description: "",
          price: 9.80,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-frit-guacamole-jalapeno-oignon-frit",
          name: "California Poulet Frit, Guacamole, Jalapeno, Oignon Frit",
          description: "",
          price: 9.40,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-enrobe-de-thon-zeste-de-peche-tobiko",
          name: "Rolls Avocat Enrobé de Thon, Zeste de Pêche, Tobiko",
          description: "",
          price: 10.30,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-avocat-tobiko-menthe",
          name: "Flocon Saumon Avocat, Tobiko, Menthe",
          description: "",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-braise-enrobe-de-saumon-braise-truffe",
          name: "California Saumon Braisé Enrobé de Saumon Braisé, Truffe",
          description: "",
          price: 12.50,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-guacamole-jalapeno",
          name: "California Saumon Guacamole Jalapeno",
          description: "",
          price: 11.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-enrobe-de-saumon-braise-sauce-truffe",
          name: "Roll's Avocat Enrobé de Saumon Braisé, Sauce Truffe",
          description: "",
          price: 13.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Crispys (frit) par 6",
      items: [
        {
          id: "crispys-crevette-tempura-cheese-ciboulette-oignon-frit-sauce-spicy",
          name: "Crevette Tempura Cheese Ciboulette Oignon Frit Sauce Spicy",
          description: "",
          price: 12.40,
          image: "/final-img.png"
        },
        {
          id: "crispys-cheese-saumon-facon-tartare-ciboulette",
          name: "Cheese Saumon Façon Tartare Ciboulette",
          description: "",
          price: 11.20,
          image: "/final-img.png"
        },
        {
          id: "crispys-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 10.30,
          image: "/final-img.png"
        },
        {
          id: "crispys-saumon-avocat-cheese-oignon-frit",
          name: "Saumon Avocat Cheese Oignon Frit",
          description: "",
          price: 12.30,
          image: "/final-img.png"
        },
        {
          id: "crispys-poulet-frit-cheddar-oignon-frit",
          name: "Poulet Frit Cheddar Oignon Frit",
          description: "",
          price: 11.50,
          image: "/final-img.png"
        },
        {
          id: "crispys-crevette-tempura-saumon-sauce-du-chef-billes-citronnees",
          name: "Crevette Tempura Saumon Sauce du Chef, Billes Citronnées",
          description: "",
          price: 12.30,
          image: "/final-img.png"
        },
        {
          id: "crispys-saumon-cuit-cheese-fraise-sauce-du-chef",
          name: "Saumon Cuit Cheese Fraise Sauce du Chef",
          description: "",
          price: 11.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Calispring par 6",
      items: [
        {
          id: "calispring-thon-cuit-mayo",
          name: "Thon Cuit Mayo",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "calispring-poulet-frit-avocat",
          name: "Poulet Frit Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "calispring-poulet-frit-avocat-cheese",
          name: "Poulet Frit Avocat Cheese",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "calispring-gambas-cheese",
          name: "Gambas Cheese",
          description: "",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "calispring-gambas-avocat",
          name: "Gambas Avocat",
          description: "",
          price: 7.30,
          image: "/final-img.png"
        },
        {
          id: "calispring-saumon",
          name: "Saumon",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "calispring-thon-cuit-cheese",
          name: "Thon Cuit Cheese",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "calispring-saumon-cheese-tobiko",
          name: "Saumon, Cheese, Tobiko",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "calispring-thon-mangue",
          name: "Thon Mangue",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Roll's par 6",
      items: [
        {
          id: "rolls-saumon",
          name: "Saumon",
          description: "",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "rolls-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-cheese",
          name: "Avocat Cheese",
          description: "",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "rolls-cheese",
          name: "Cheese",
          description: "",
          price: 7.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-concombre-avocat-enrobe-de-mangue-et-saumon",
          name: "Concombre Avocat Enrobé de Mangue et Saumon",
          description: "",
          price: 8.60,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-enrobe-de-thon-saumon-tobiko",
          name: "Avocat Enrobé de Thon, Saumon, Tobiko",
          description: "",
          price: 8.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Flocon par 6",
      items: [
        {
          id: "flocon-saumon",
          name: "Saumon",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "flocon-gambas-mayo",
          name: "Gambas Mayo",
          description: "",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-thon",
          name: "Thon",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-thon-avocat",
          name: "Thon Avocat",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Buritos",
      items: [
        {
          id: "buritos-saumon-avocat-cheese",
          name: "Saumon Avocat Cheese",
          description: "",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "buritos-poulet-frit-avocat-mayo",
          name: "Poulet Frit Avocat Mayo",
          description: "",
          price: 12.50,
          image: "/final-img.png"
        },
        {
          id: "buritos-poulet-caramelise",
          name: "Poulet Caramélisé",
          description: "",
          price: 12.30,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Chirashi 10 tranches",
      items: [
        {
          id: "chirashi-saumon",
          name: "Saumon",
          description: "",
          price: 16.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 17.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-thon",
          name: "Saumon, Thon",
          description: "",
          price: 17.90,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-thon-avocat",
          name: "Saumon Thon Avocat",
          description: "",
          price: 18.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-gambas-saumon-thon",
          name: "Gambas, Saumon, Thon",
          description: "",
          price: 18.90,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-avocat-cheese-oignon-frit",
          name: "Saumon Avocat Cheese Oignon Frit",
          description: "",
          price: 17.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nos Accompagnements",
      items: [
        {
          id: "accompagnements-sushi-saumon-avocat",
          name: "Sushi Saumon Avocat",
          description: "",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "accompagnements-poulet-frit-avocat-mayo",
          name: "Poulet Frit Avocat Mayo",
          description: "",
          price: 12.50,
          image: "/final-img.png"
        },
        {
          id: "accompagnements-poulet-caramelise",
          name: "Poulet Caramélisé",
          description: "",
          price: 12.30,
          image: "/final-img.png"
        }
      ]
    }
  ]
  // const menuLivraisons = menuSurPlace // This was already defined as menuSurPlace, keeping it for consistency

  const combinedLivraisonsMenu = [
    ...menuSurPlace,
    {
      category: "Rolls Spéciaux",
      items: [
        {
          id: "dragon-roll",
          name: "Dragon Roll",
          description: "Avocat, concombre, anguille grillée, sauce teriyaki",
          price: 14,
          image: "/final-img.png"
        },
        {
          id: "rainbow-roll",
          name: "Rainbow Roll",
          description: "Saumon, thon, avocat sur california roll",
          price: 16,
          image: "/final-img.png"
        },
        {
          id: "spicy-tuna-roll",
          name: "Spicy Tuna Roll",
          description: "Thon épicé, mayo sriracha, graines de sésame",
          price: 12,
          image: "/final-img.png"
        },
        {
          id: "philadelphia-roll",
          name: "Philadelphia Roll",
          description: "Saumon fumé, fromage frais, concombre",
          price: 13,
          image: "/final-img.png"
        }
      ]
    }
  ];

  const creations = [
    {
      name: "Sushi Saumon Avocat",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Maki California",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Sashimi Thon",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Chirashi Bowl",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Nigiri Assortiment",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Temaki Saumon",
      image: "/placeholder.svg?height=300&width=400",
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

  // Carousel states for each tab
  const [currentSlideSurPlace, setCurrentSlideSurPlace] = useState(0);
  const [currentSlideAEmporter, setCurrentSlideAEmporter] = useState(0);
  const [currentSlideLivraisons, setCurrentSlideLivraisons] = useState(0);

  const itemsPerPage = 3;

  const totalSlidesSurPlace = Math.ceil(menuSurPlace.length / itemsPerPage);
  const totalSlidesAEmporter = Math.ceil(menuAEmporter.length / itemsPerPage);
  const totalSlidesLivraisons = Math.ceil(combinedLivraisonsMenu.length / itemsPerPage);

  const goToNextSlide = (setter: React.Dispatch<React.SetStateAction<number>>, totalSlides: number) => {
    setter((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = (setter: React.Dispatch<React.SetStateAction<number>>, totalSlides: number) => {
    setter((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

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
              <Link
                href="#contact"
                className="text-gray-700 hover:text-temple-pink transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="hidden md:block" />
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center`}
          >
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
              <AboutImages />
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
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-white gap-2 rounded-lg p-1">
              <TabsTrigger
                value="sur-place"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 text-sm sm:text-base rounded-md transition-all duration-300"
              >
                <UtensilsCrossed className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Sur Place</span>
              </TabsTrigger>
              <TabsTrigger
                value="a-emporter"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 text-sm sm:text-base rounded-md transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                <span className="truncate sm:hidden">À Emporter</span>
                <span className="truncate hidden sm:inline">À Emporter & Livraison</span>
              </TabsTrigger>
              <TabsTrigger
                value="livraisons"
                className="data-[state=active]:bg-temple-pink data-[state=active]:text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 text-sm sm:text-base rounded-md transition-all duration-300"
              >
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Libre-service</span>
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
              {/* Carousel pour Sur Place */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlideSurPlace * (100 / itemsPerPage)}%)` }}
                  >
                    {menuSurPlace.map((category, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4" // Adjust width for 3 items per row
                      >
                        <Card className="h-full bg-gradient-to-br from-white via-white to-gray-50/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
                          <div className="relative bg-gradient-to-r from-temple-pink/10 via-temple-pink/5 to-temple-pink/10 p-6 border-b border-temple-pink/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center justify-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-temple-pink/20 rounded-full flex items-center justify-center group-hover:bg-temple-pink/30 transition-colors duration-300">
                                  <UtensilsCrossed className="w-4 h-4 text-temple-pink" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-temple-pink transition-colors duration-300">
                                  {category.category}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-0">
                            <div className="max-h-96 overflow-y-auto">
                              {category.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="group/item p-4 border-b border-gray-100 last:border-b-0 hover:bg-temple-pink/5 transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-900 group-hover/item:text-temple-pink transition-colors duration-300 truncate pr-2">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      <Badge
                                        variant="outline"
                                        className="bg-temple-pink/10 text-temple-pink border-temple-pink/30 font-bold text-sm px-2 py-1"
                                      >
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
                                  <div className="h-0.5 bg-gradient-to-r from-temple-pink to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mt-3"></div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-temple-pink" />
                                Service continu
                              </span>
                              <span className="flex items-center font-medium text-temple-pink">
                                <MapPin className="w-4 h-4 mr-1" />
                                Sur place
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Carousel Navigation */}
                {totalSlidesSurPlace > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-black rounded-full shadow-md z-10 hover:bg-temple-pink/100"
                      onClick={() => goToPrevSlide(setCurrentSlideSurPlace, totalSlidesSurPlace)}
                      disabled={currentSlideSurPlace === 0}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-black rounded-full shadow-md z-10 hover:bg-temple-pink/100"
                      onClick={() => goToNextSlide(setCurrentSlideSurPlace, totalSlidesSurPlace)}
                      disabled={currentSlideSurPlace === totalSlidesSurPlace - 1}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </div>
              {/* Section informative en bas */}
              <div className="mt-12 bg-gradient-to-r from-temple-pink/5 via-white to-temple-pink/5 rounded-2xl p-8 border border-temple-pink/10">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Expérience Sur Place</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Plongez dans l'ambiance authentique de notre restaurant japonais. Savourez chaque bouchée dans un cadre chaleureux,
                    accompagné de notre service attentionné et de l'art culinaire de nos chefs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center text-gray-700">
                      <UtensilsCrossed className="w-5 h-5 mr-2 text-temple-pink" />
                      <span className="font-medium">Service à table</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Heart className="w-5 h-5 mr-2 text-temple-pink" />
                      <span className="font-medium">Ambiance authentique</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Star className="w-5 h-5 mr-2 text-temple-pink" />
                      <span className="font-medium">Expérience premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="a-emporter">
              {/* Card compacte et animée pour les délais */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  {/* Effet de glow animé */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-temple-pink/20 via-temple-pink/40 to-temple-pink/20 rounded-xl blur opacity-75 animate-pulse"></div>
                  <Card className="relative w-fit bg-white/90 backdrop-blur-sm border-2 border-temple-pink/30 hover:border-temple-pink/60 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 animate-bounce-in">
                    <CardContent className="px-6 py-3">
                      <div className="flex items-center gap-6">
                        {/* Badge "Nouveau" */}
                        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-wiggle">
                          ⚡ RAPIDE
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-temple-pink/20 to-temple-pink/30 rounded-full flex items-center justify-center shadow-inner">
                            <ShoppingBag className="w-5 h-5 text-temple-pink animate-bounce" />
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium">À emporter</p>
                            <p className="text-lg font-bold text-temple-pink">20-30min</p>
                          </div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-temple-pink/50 to-transparent"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-temple-pink/20 to-temple-pink/30 rounded-full flex items-center justify-center shadow-inner">
                            <Package className="w-5 h-5 text-temple-pink animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium">Livraison</p>
                            <p className="text-lg font-bold text-temple-pink">45min</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <style jsx>{`
                @keyframes bounce-in {
                  0% { opacity: 0; transform: scale(0.3); }
                  50% { opacity: 1; transform: scale(1.05); }
                  70% { transform: scale(0.9); }
                  100% { opacity: 1; transform: scale(1); }
                }
                @keyframes wiggle {
                  0%, 7% { transform: rotateZ(0); }
                  15% { transform: rotateZ(-15deg); }
                  20% { transform: rotateZ(10deg); }
                  25% { transform: rotateZ(-10deg); }
                  30% { transform: rotateZ(6deg); }
                  35% { transform: rotateZ(-4deg); }
                  40%, 100% { transform: rotateZ(0); }
                }
                .animate-bounce-in {
                  animation: bounce-in 0.8s ease-out;
                }
                .animate-wiggle {
                  animation: wiggle 2s ease-in-out infinite;
                }
              `}</style>
              {/* Carousel pour À Emporter */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlideAEmporter * (100 / itemsPerPage)}%)` }}
                  >
                    {menuAEmporter.map((category, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4" // Adjust width for 3 items per row
                      >
                        <Card className="h-full bg-gradient-to-br from-white via-white to-gray-50/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
                          <div className="relative bg-gradient-to-r from-temple-pink/10 via-temple-pink/5 to-temple-pink/10 p-6 border-b border-temple-pink/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center justify-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-temple-pink/20 rounded-full flex items-center justify-center group-hover:bg-temple-pink/30 transition-colors duration-300">
                                  <UtensilsCrossed className="w-4 h-4 text-temple-pink" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-temple-pink transition-colors duration-300">
                                  {category.category}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-0">
                            <div className="max-h-96 overflow-y-auto">
                              {category.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="group/item p-4 border-b border-gray-100 last:border-b-0 hover:bg-temple-pink/5 transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-900 group-hover/item:text-temple-pink transition-colors duration-300 truncate pr-2">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      <Badge
                                        variant="outline"
                                        className="bg-temple-pink/10 text-temple-pink border-temple-pink/30 font-bold text-sm px-2 py-1"
                                      >
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
                                  <div className="h-0.5 bg-gradient-to-r from-temple-pink to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mt-3"></div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-temple-pink" />
                                20-30min
                              </span>
                              <span className="flex items-center font-medium text-temple-pink">
                                <ShoppingBag className="w-4 h-4 mr-1" />
                                À emporter
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Carousel Navigation */}
                {totalSlidesAEmporter > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-black rounded-full shadow-md z-10 hover:bg-temple-pink/100"
                      onClick={() => goToPrevSlide(setCurrentSlideAEmporter, totalSlidesAEmporter)}
                      disabled={currentSlideAEmporter === 0}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow-md hover:bg-white z-10"
                      onClick={() => goToNextSlide(setCurrentSlideAEmporter, totalSlidesAEmporter)}
                      disabled={currentSlideAEmporter === totalSlidesAEmporter - 1}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}
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
              {/* Carousel pour Libre-service */}
                
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
            <GoogleReviews />
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
            <InstagramFeed />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`relative py-20 bg-gray-900 text-white overflow-hidden transition-all duration-1000 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                    content: "Mar - Sam: 11h30 - 14h00, 18h00 - 22h00\nDimanche: 18h00 - 22h00\nLundi: Fermé",
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4099.657450652335!2d5.395389176969172!3d43.44936186558957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c99366e46187f9%3A0x5562ae9155d32d69!2sAu%20temple%20du%20sushi!5e1!3m2!1sfr!2sfr!4v1754385007549!5m2!1sfr!2sfr"
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
                <li>
                  <Link href="#contact" className="hover:text-temple-pink transition-colors font-medium">
                    Contact
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
                <Link href="https://www.instagram.com/autempledusushi__/" className="text-gray-400 hover:text-temple-pink transition-colors">
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Button
          size="lg"
          className="bg-temple-pink hover:bg-temple-pink/90 text-black shadow-lg rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold relative"
          onClick={() => setIsOrderModalOpen(true)}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Réserver
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
