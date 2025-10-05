"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Search, Filter, Star, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LatLngExpression } from "leaflet";

// Dynamic import to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(
  () => import("@/components/map/interactive-map").then((mod) => ({ default: mod.InteractiveMap })),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-muted rounded-lg" /> }
);

interface Location {
  id: string;
  name: string;
  country: string;
  position: LatLngExpression;
  description: string;
  image?: string;
  rating?: number;
  reviews?: number;
  category: "attraction" | "restaurant" | "hotel" | "activity";
}

const LOCATIONS: Location[] = [
  {
    id: "1",
    name: "Colosseum",
    country: "Italy",
    position: [41.8902, 12.4922],
    description: "Ancient Roman amphitheater and iconic landmark",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 12543,
    category: "attraction",
  },
  {
    id: "2",
    name: "Trevi Fountain",
    country: "Italy",
    position: [41.9009, 12.4833],
    description: "Baroque fountain famous for coin-tossing tradition",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 8932,
    category: "attraction",
  },
  {
    id: "3",
    name: "Vatican Museums",
    country: "Italy",
    position: [41.9065, 12.4536],
    description: "World-renowned art museums in Vatican City",
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 15678,
    category: "attraction",
  },
  {
    id: "4",
    name: "Pantheon",
    country: "Italy",
    position: [41.8986, 12.4769],
    description: "Ancient Roman temple with impressive dome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 7234,
    category: "attraction",
  },
  {
    id: "5",
    name: "Trastevere",
    country: "Italy",
    position: [41.8894, 12.4697],
    description: "Charming neighborhood with cobblestone streets",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 4521,
    category: "activity",
  },
  {
    id: "6",
    name: "Eiffel Tower",
    country: "France",
    position: [48.8584, 2.2945],
    description: "Iconic iron tower and symbol of Paris",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 23456,
    category: "attraction",
  },
  {
    id: "7",
    name: "Louvre Museum",
    country: "France",
    position: [48.8606, 2.3376],
    description: "World's largest art museum and historic monument",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 18765,
    category: "attraction",
  },
];

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([41.9028, 12.4964]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredLocations = LOCATIONS.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setMapCenter(location.position);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "attraction": return "bg-blue-500";
      case "restaurant": return "bg-green-500";
      case "hotel": return "bg-purple-500";
      case "activity": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar */}
      <Card className="w-96 flex-shrink-0">
        <CardContent className="flex h-full flex-col p-4">
          {/* Search */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="attraction" className="text-xs">Sites</TabsTrigger>
                <TabsTrigger value="restaurant" className="text-xs">Food</TabsTrigger>
                <TabsTrigger value="hotel" className="text-xs">Stay</TabsTrigger>
                <TabsTrigger value="activity" className="text-xs">Do</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Results Count */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filteredLocations.length} locations found
            </span>
            <Button variant="ghost" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Locations List */}
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation?.id === location.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleLocationClick(location)}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      {location.image && (
                        <img
                          src={location.image}
                          alt={location.name}
                          className="h-20 w-20 flex-shrink-0 rounded object-cover"
                        />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold leading-tight">{location.name}</h3>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">{location.country}</p>
                        {location.rating && (
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{location.rating}</span>
                            <span className="text-muted-foreground">({location.reviews})</span>
                          </div>
                        )}
                        <Badge variant="secondary" className={`${getCategoryColor(location.category)} text-white`}>
                          {location.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Legend */}
          <div className="mt-4 space-y-2 border-t pt-4">
            <h4 className="text-sm font-semibold">Legend</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Attractions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span>Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>Activities</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="flex-1">
        <CardContent className="h-full p-0">
          {isMounted && (
            <InteractiveMap
              locations={filteredLocations}
              center={mapCenter}
              zoom={12}
              onLocationClick={handleLocationClick}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
