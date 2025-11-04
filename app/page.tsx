"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, MapPin, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Global landmarks for rotating hero background
const heroLandmarks = [
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&h=900&fit=crop",
    title: "Paris, France"
  },
  {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop",
    title: "London, UK"
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
    title: "Swiss Alps"
  },
  {
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=900&fit=crop",
    title: "Santorini, Greece"
  },
  {
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1600&h=900&fit=crop",
    title: "Tokyo, Japan"
  },
];

// Featured destinations with images
const featuredDestinations = [
  {
    name: "The Alps",
    description: "Explore ancient peaks and charming villages.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop",
    region: "Europe"
  },
  {
    name: "Maldives",
    description: "Relax on pristine beaches and dive into crystal-clear waters.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=350&fit=crop",
    region: "Asia"
  },
  {
    name: "New York",
    description: "Experience the vibrant energy and iconic landmarks.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=350&fit=crop",
    region: "Americas"
  },
  {
    name: "Sahara",
    description: "Embark on an unforgettable journey through the vast desert.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&h=350&fit=crop",
    region: "Africa"
  },
  {
    name: "Bali",
    description: "Discover tropical paradise with stunning temples and beaches.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=350&fit=crop",
    region: "Asia"
  },
  {
    name: "Iceland",
    description: "Witness the Northern Lights and dramatic volcanic landscapes.",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=500&h=350&fit=crop",
    region: "Europe"
  },
  {
    name: "Machu Picchu",
    description: "Trek to ancient Incan ruins high in the Andes mountains.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=350&fit=crop",
    region: "Americas"
  },
  {
    name: "Dubai",
    description: "Experience luxury shopping and futuristic architecture.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=350&fit=crop",
    region: "Asia"
  },
];

// Popular countries
const popularCountries = [
  {
    code: "FR",
    name: "France",
    description: "Discover the romantic charm of Paris and the French Riviera.",
  },
  {
    code: "JP",
    name: "Japan",
    description: "Experience the blend of ancient traditions and modern technology.",
  },
  {
    code: "IT",
    name: "Italy",
    description: "Art, history, and world-class cuisine from Rome to Venice.",
  },
  {
    code: "ES",
    name: "Spain",
    description: "Vibrant culture, stunning beaches, and architectural wonders.",
  },
  {
    code: "US",
    name: "United States",
    description: "From New York to California, experience diverse landscapes and cities.",
  },
  {
    code: "GB",
    name: "United Kingdom",
    description: "Historic castles, royal palaces, and charming countryside.",
  },
  {
    code: "DE",
    name: "Germany",
    description: "Medieval towns, fairy-tale castles, and vibrant modern cities.",
  },
  {
    code: "TH",
    name: "Thailand",
    description: "Tropical paradise with temples, beaches, and amazing street food.",
  },
  {
    code: "GR",
    name: "Greece",
    description: "Ancient ruins, white-washed islands, and Mediterranean beauty.",
  },
  {
    code: "AU",
    name: "Australia",
    description: "From the Sydney Opera House to the vast Outback.",
  },
  {
    code: "BR",
    name: "Brazil",
    description: "Explore vibrant culture, the Amazon rainforest, and Iguazu Falls.",
  },
  {
    code: "CA",
    name: "Canada",
    description: "Stunning natural beauty from the Rockies to Niagara Falls.",
  },
  {
    code: "MX",
    name: "Mexico",
    description: "Ancient Mayan ruins, beautiful beaches, and rich cultural heritage.",
  },
  {
    code: "IN",
    name: "India",
    description: "The Taj Mahal, colorful festivals, and diverse cultural experiences.",
  },
  {
    code: "CN",
    name: "China",
    description: "Great Wall, terracotta warriors, and modern metropolises.",
  },
  {
    code: "TR",
    name: "Turkey",
    description: "Where East meets West, from Istanbul to Cappadocia.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    description: "Futuristic Dubai, luxury shopping, and desert adventures.",
  },
  {
    code: "EG",
    name: "Egypt",
    description: "Ancient pyramids, the Sphinx, and the Nile River.",
  },
  {
    code: "ZA",
    name: "South Africa",
    description: "Safari adventures, Table Mountain, and diverse wildlife.",
  },
  {
    code: "AR",
    name: "Argentina",
    description: "Tango, wine country, and breathtaking Patagonian landscapes.",
  },
  {
    code: "NZ",
    name: "New Zealand",
    description: "Lord of the Rings landscapes, adventure sports, and Maori culture.",
  },
  {
    code: "PT",
    name: "Portugal",
    description: "Charming coastal towns, port wine, and historic Lisbon.",
  },
  {
    code: "NL",
    name: "Netherlands",
    description: "Windmills, tulips, and the enchanting canals of Amsterdam.",
  },
  {
    code: "CH",
    name: "Switzerland",
    description: "Alpine peaks, pristine lakes, and world-renowned chocolate.",
  },
  {
    code: "AT",
    name: "Austria",
    description: "Classical music, imperial palaces, and Alpine scenery.",
  },
  {
    code: "NO",
    name: "Norway",
    description: "Fjords, Northern Lights, and stunning natural landscapes.",
  },
  {
    code: "SE",
    name: "Sweden",
    description: "Modern design, historic Viking sites, and beautiful archipelagos.",
  },
  {
    code: "DK",
    name: "Denmark",
    description: "Fairy-tale Copenhagen, LEGO, and Scandinavian charm.",
  },
  {
    code: "IS",
    name: "Iceland",
    description: "Geysers, waterfalls, glaciers, and the Northern Lights.",
  },
  {
    code: "IE",
    name: "Ireland",
    description: "Emerald landscapes, ancient castles, and lively pub culture.",
  },
  {
    code: "PL",
    name: "Poland",
    description: "Medieval architecture, rich history, and vibrant cities.",
  },
  {
    code: "CZ",
    name: "Czech Republic",
    description: "Fairy-tale Prague, historic castles, and world-class beer.",
  },
  {
    code: "HU",
    name: "Hungary",
    description: "Thermal baths, stunning Parliament, and delicious cuisine.",
  },
  {
    code: "HR",
    name: "Croatia",
    description: "Adriatic coastline, ancient walled cities, and island hopping.",
  },
  {
    code: "MA",
    name: "Morocco",
    description: "Vibrant souks, Sahara desert, and colorful riads.",
  },
  {
    code: "PE",
    name: "Peru",
    description: "Machu Picchu, Amazon rainforest, and Incan heritage.",
  },
  {
    code: "CL",
    name: "Chile",
    description: "Atacama Desert, Patagonia, and Easter Island mysteries.",
  },
  {
    code: "KR",
    name: "South Korea",
    description: "K-pop culture, historic palaces, and modern Seoul.",
  },
  {
    code: "SG",
    name: "Singapore",
    description: "Futuristic city-state, hawker food, and Gardens by the Bay.",
  },
  {
    code: "MY",
    name: "Malaysia",
    description: "Petronas Towers, tropical beaches, and diverse cuisine.",
  },
  {
    code: "ID",
    name: "Indonesia",
    description: "Bali temples, Komodo dragons, and volcanic landscapes.",
  },
  {
    code: "VN",
    name: "Vietnam",
    description: "Ha Long Bay, bustling Hanoi, and rich history.",
  },
  {
    code: "PH",
    name: "Philippines",
    description: "7,000+ islands, pristine beaches, and warm hospitality.",
  },
];

// Popular search suggestions - Expanded list
const searchSuggestions = [
  "France", "Japan", "Italy", "Spain", "United States", "United Kingdom", "Germany", "Thailand",
  "Greece", "Australia", "Brazil", "Canada", "Mexico", "India", "China", "Turkey",
  "United Arab Emirates", "Egypt", "South Africa", "Argentina", "New Zealand", "Portugal",
  "Netherlands", "Switzerland", "Austria", "Norway", "Sweden", "Denmark", "Iceland", "Ireland",
  "Poland", "Czech Republic", "Hungary", "Croatia", "Morocco", "Peru", "Chile",
  "South Korea", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Philippines"
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLandmark, setCurrentLandmark] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string; top: string; delay: string; duration: string}>>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Generate particles only on client side
  useEffect(() => {
    setIsMounted(true);
    const generatedParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  // Rotating hero background effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLandmark((prev) => (prev + 1) % heroLandmarks.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && searchFocused);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, searchFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/destinations?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    window.location.href = `/destinations?search=${encodeURIComponent(suggestion)}`;
  };

  // Carousel navigation
  const nextSlide = () => {
    setCarouselIndex((prev) => {
      // Stop at the last set of visible items (3 items visible at a time on desktop)
      const maxIndex = Math.max(0, featuredDestinations.length - 3);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => {
      const maxIndex = Math.max(0, featuredDestinations.length - 3);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCarouselIndex(index);
  };

  // Auto-swipe carousel every 5 seconds
  useEffect(() => {
    const autoSwipe = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoSwipe);
  }, [carouselIndex]); // Re-run when carouselIndex changes

  return (
    <div className="w-full">
      {/* Hero Section with Rotating Background - Full Width */}
      <section className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Rotating Background Images - More Visible */}
        {heroLandmarks.map((landmark, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${
              index === currentLandmark ? "opacity-60" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${landmark.image}')`,
              transitionDuration: "2000ms",
            }}
          />
        ))}
        
        {/* Lighter Gradient Overlay for Better Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        
        {/* Floating particles effect - only render on client */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/20 animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Content */}
        <div 
          className={`relative z-10 flex flex-col items-center justify-center space-y-8 px-4 py-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 animate-fade-in">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400 drop-shadow-lg">
                {heroLandmarks[currentLandmark].title}
              </span>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-6xl md:text-7xl animate-slide-up">
              Explore the world with us
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white drop-shadow-lg sm:text-xl animate-slide-up animation-delay-200">
              Discover hidden gems and iconic landmarks in every corner of the globe.
              <br />Your adventure starts here.
            </p>
          </div>
          
          {/* Enhanced Interactive Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl animate-slide-up animation-delay-400">
            <div className="relative">
              <div 
                className={`flex gap-2 rounded-full bg-white/95 backdrop-blur-md p-2 shadow-2xl transition-all duration-300 ${
                  searchFocused 
                    ? "ring-4 ring-blue-400/60 shadow-blue-500/50 scale-105 bg-white" 
                    : "hover:shadow-blue-500/40 hover:scale-102 hover:bg-white"
                }`}
              >
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => {
                      // Delay to allow click on suggestions
                      setTimeout(() => setSearchFocused(false), 200);
                    }}
                    className="border-0 bg-transparent text-base font-medium text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-4"
                  />
                  <Search className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300 ${
                    searchFocused ? "text-blue-500" : "text-gray-400"
                  }`} />
                  
                  {/* Clear button */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="rounded-full px-8 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  Search
                </Button>
              </div>
              
              {/* Interactive Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-lg p-2 shadow-2xl border border-blue-100 animate-slide-down">
                  <div className="mb-2 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Suggested Countries</p>
                  </div>
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="group w-full rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-102 hover:shadow-md active:scale-100"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-100 p-2 transition-colors duration-200 group-hover:bg-blue-500">
                            <MapPin className="h-4 w-4 text-blue-600 transition-colors duration-200 group-hover:text-white" />
                          </div>
                          <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600">{suggestion}</span>
                        </div>
                        <svg className="h-4 w-4 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Featured Destinations Carousel */}
      <section className="relative mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="mb-3 text-4xl font-bold">Featured Destinations</h2>
          <p className="text-muted-foreground">Handpicked locations for your next adventure</p>
        </div>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl" ref={carouselRef}>
            <div 
              className="flex gap-4 transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${carouselIndex * (100 / 3)}%)` 
              }}
            >
              {featuredDestinations.map((destination, index) => (
                <div
                  key={destination.name}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                >
                  <Card className="group overflow-hidden border-2 border-transparent transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:scale-105">
                    <div className="relative h-96 overflow-hidden">
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Region badge */}
                      <div className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                        {destination.region}
                      </div>
                      
                      {/* Image with zoom effect */}
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-3xl font-bold">{destination.name}</h3>
                            <p className="text-base text-white/90">{destination.description}</p>
                          </div>
                          <MapPin className="h-6 w-6 transition-all duration-300 group-hover:scale-125" />
                        </div>
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: Math.max(1, featuredDestinations.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === carouselIndex 
                    ? "w-8 bg-blue-600" 
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Countries with Advanced Animations */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="mb-3 text-4xl font-bold">Popular Countries</h2>
          <p className="text-muted-foreground">Start your journey with these trending destinations</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCountries.map((country, index) => (
            <Link 
              key={country.code} 
              href={`/country/${country.code}`}
              className="block animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card className="group relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 border-transparent hover:border-blue-300">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Animated corner accent */}
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-blue-400/20 blur-2xl transition-all duration-500 group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:bg-blue-400/40" />
                
                <CardContent className="relative flex flex-col items-center p-8 text-center">
                  {/* Flag Image with animations */}
                  <div className="mb-6 transition-all duration-500 group-hover:scale-110">
                    <div className="relative">
                      <div className="h-28 w-28 overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                        <img
                          src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                          alt={`${country.name} flag`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-400/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                    </div>
                  </div>
                  
                  {/* Country name with gradient effect */}
                  <h3 className="mb-3 text-2xl font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                    {country.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                    {country.description}
                  </p>
                  
                  {/* Explore button (appears on hover) */}
                  <div className="mt-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg">
                      <span>Explore Now</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse-border" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


